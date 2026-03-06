package notification

import (
	"context"
	"fmt"
	"notification-service/internal/model"
	"notification-service/internal/provider"
	"notification-service/internal/queue"
	"time"
)

type Notifier interface {
	SendEmail(ctx context.Context, tenantID string, req EmailRequest) error
	SendSMS(ctx context.Context, tenantID string, req SMSRequest) error
	SendOTP(ctx context.Context, tenantID string, req OTPRequest) error
} // Refactoring to not use internal package in public interface

type notificationSDK struct {
	config        Config
	emailProvider provider.EmailProvider
	smsProvider   provider.SMSProvider
	queue         queue.Queue
}

func New(cfg Config) Notifier {
	sdk := &notificationSDK{
		config: cfg,
	}

	// Initialize Provider
	if cfg.EmailProvider == ProviderSMTP {
		sdk.emailProvider = provider.NewSMTPProvider(
			cfg.SMTPConfig.Host,
			cfg.SMTPConfig.Port,
			cfg.SMTPConfig.Username,
			cfg.SMTPConfig.Password,
			cfg.SMTPConfig.From,
		)
	} else {
		sdk.emailProvider = provider.NewMockProvider()
	}

	// For SMS, we'll use mock for now
	sdk.smsProvider = provider.NewMockProvider().(provider.SMSProvider)

	// Initialize Queue if in Async mode
	if cfg.Mode == ModeAsync {
		if cfg.QueueProvider == QueueRedis {
			sdk.queue = queue.NewRedisQueue(
				cfg.RedisConfig.Addr,
				cfg.RedisConfig.Password,
				cfg.RedisConfig.DB,
				"notifications",
			)
		}
	}

	return sdk
}

func (n *notificationSDK) SendEmail(ctx context.Context, tenantID string, req EmailRequest) error {
	internalReq := model.EmailRequest{
		To:      req.To,
		Subject: req.Subject,
		Body:    req.Body,
		Data:    req.Data,
	}
	if n.config.Mode == ModeAsync {
		return n.publish(ctx, tenantID, "email", internalReq)
	}
	return n.emailProvider.SendEmail(ctx, internalReq)
}

func (n *notificationSDK) SendSMS(ctx context.Context, tenantID string, req SMSRequest) error {
	internalReq := model.SMSRequest{
		To:      req.To,
		Message: req.Message,
	}
	if n.config.Mode == ModeAsync {
		return n.publish(ctx, tenantID, "sms", internalReq)
	}
	return n.smsProvider.SendSMS(ctx, internalReq)
}

func (n *notificationSDK) SendOTP(ctx context.Context, tenantID string, req OTPRequest) error {
	internalReq := model.OTPRequest{
		To:     req.To,
		Code:   req.Code,
		Method: req.Method,
	}
	if n.config.Mode == ModeAsync {
		return n.publish(ctx, tenantID, "otp", internalReq)
	}

	// Direct OTP implementation could be more complex, but for now:
	if req.Method == "email" {
		return n.emailProvider.SendEmail(ctx, model.EmailRequest{
			To:      req.To,
			Subject: "Your OTP Code",
			Body:    "Your code is: " + req.Code,
		})
	}
	return n.smsProvider.SendSMS(ctx, model.SMSRequest{
		To:      req.To,
		Message: "Your OTP code is: " + req.Code,
	})
}

func (n *notificationSDK) publish(ctx context.Context, tenantID string, msgType string, payload interface{}) error {
	if n.queue == nil {
		return fmt.Errorf("queue not initialized for async mode")
	}
	event := model.NotificationEvent{
		ID:        fmt.Sprintf("%d", time.Now().UnixNano()), // Basic ID generation
		TenantID:  tenantID,
		Type:      msgType,
		Payload:   payload,
		Timestamp: time.Now(),
	}
	return n.queue.Publish(ctx, event)
}
