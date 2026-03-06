package provider

import (
	"context"
	"notification-service/internal/model"
)

type EmailProvider interface {
	SendEmail(ctx context.Context, req model.EmailRequest) error
}

type SMSProvider interface {
	SendSMS(ctx context.Context, req model.SMSRequest) error
}
