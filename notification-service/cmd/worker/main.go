package main

import (
	"context"
	"fmt"
	"log"
	"notification-service/internal/model"
	"notification-service/internal/provider"
	"notification-service/internal/queue"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	fmt.Println("Starting Notification Worker...")

	// Initialize Provider (e.g. SMTP)
	// In a real app, these would come from env vars
	emailProvider := provider.NewSMTPProvider(
		"smtp.gmail.com",
		587,
		"chandragiriharshavardhan@gmail.com",
		"mscj abin omqq iihe",
		"chandragiriharshavardhan@gmail.com",
	)
	smsProvider := provider.NewMockProvider().(provider.SMSProvider)

	// Initialize Queue
	q := queue.NewRedisQueue("localhost:6379", "", 0, "notifications")

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer cancel()

	err := q.Subscribe(ctx, func(event model.NotificationEvent) error {
		log.Printf("Received event: ID=%s, Type=%s\n", event.ID, event.Type)

		switch event.Type {
		case "email":
			// We need to map the payload back to EmailRequest
			// In a real app, use a more robust deserialization
			payload, ok := event.Payload.(map[string]interface{})
			if !ok {
				log.Println("Invalid payload for email")
				return nil
			}
			req := model.EmailRequest{
				To:      payload["To"].(string),
				Subject: payload["Subject"].(string),
				Body:    payload["Body"].(string),
			}
			return emailProvider.SendEmail(ctx, req)

		case "sms":
			payload, ok := event.Payload.(map[string]interface{})
			if !ok {
				log.Println("Invalid payload for sms")
				return nil
			}
			req := model.SMSRequest{
				To:      payload["To"].(string),
				Message: payload["Message"].(string),
			}
			return smsProvider.SendSMS(ctx, req)

		case "otp":
			// Handle OTP
			log.Printf("Processing OTP event: %+v\n", event.Payload)
		}

		return nil
	})

	if err != nil && err != context.Canceled {
		log.Fatalf("Worker error: %v", err)
	}

	fmt.Println("Worker stopped.")
}
