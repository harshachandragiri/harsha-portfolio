package main

import (
	"context"
	"fmt"
	"log"
	"notification-service"
)

func main() {
	// 1. Setup Config for REAL SMTP Mode
	// To test this, you MUST fill in your Gmail/SMTP credentials below.
	cfgDirect := notification.Config{
		Mode:          notification.ModeDirect,
		EmailProvider: notification.ProviderSMTP, // Switched from Mock to SMTP
		SMTPConfig: notification.SMTPConfig{
			Host:     "smtp.gmail.com",
			Port:     587,
			Username: "chandragiriharshavardhan@gmail.com",
			Password: "mscj abin omqq iihe",
			From:     "chandragiriharshavardhan@gmail.com",
		},
	}

	notifier := notification.New(cfgDirect)

	ctx := context.Background()

	// Send direct email
	err := notifier.SendEmail(ctx, "tenant-1", notification.EmailRequest{
		To:      "pavankrishna048@gmail.com",
		Subject: "Testing Notification SDK (Real SMTP)",
		Body:    "This email confirms our Go Notification Service is live!\n\nArchitecture:\n1. Direct Mode: SDK sends email immediately via SMTP.\n2. Async Mode: SDK publishes event to Redis, then a Worker process picks it up and sends it.\n\nThis message was sent using Direct Mode.",
	})
	if err != nil {
		log.Fatal(err)
	}

	// 2. Setup Config for Async Mode
	cfgAsync := notification.Config{
		Mode:          notification.ModeAsync,
		QueueProvider: notification.QueueRedis,
		RedisConfig: notification.RedisConfig{
			Addr: "localhost:6379",
		},
	}

	asyncNotifier := notification.New(cfgAsync)

	// Send async email (publishes to Redis)
	err = asyncNotifier.SendEmail(ctx, "tenant-1", notification.EmailRequest{
		To:      "pavankrishna048@gmail.com",
		Subject: "Testing Notification SDK (Async)",
		Body:    "This email confirms our Go Notification Service is live!\n\nArchitecture:\n1. Direct Mode: SDK sends email immediately via SMTP.\n2. Async Mode: SDK publishes event to Redis, then a Worker process picks it up and sends it.\n\nThis message was sent using Async Mode (SDK -> Redis -> Worker -> Email).",
	})
	if err != nil {
		fmt.Printf("Error publishing (likely Redis is down): %v\n", err)
	} else {
		fmt.Println("Email published to queue successfully.")
	}
}
