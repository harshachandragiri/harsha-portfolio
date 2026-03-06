package provider

import (
	"context"
	"fmt"
	"notification-service/internal/model"
)

type mockProvider struct{}

func NewMockProvider() EmailProvider {
	return &mockProvider{}
}

func (m *mockProvider) SendEmail(ctx context.Context, req model.EmailRequest) error {
	fmt.Printf("[MOCK EMAIL] To: %s, Subject: %s\n", req.To, req.Subject)
	return nil
}

func (m *mockProvider) SendSMS(ctx context.Context, req model.SMSRequest) error {
	fmt.Printf("[MOCK SMS] To: %s, Message: %s\n", req.To, req.Message)
	return nil
}
