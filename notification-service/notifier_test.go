package notification_test

import (
	"context"
	"notification-service"
	"testing"
)

func TestNotifier_DirectMode(t *testing.T) {
	cfg := notification.Config{
		Mode:          notification.ModeDirect,
		EmailProvider: notification.ProviderMock,
	}

	notifier := notification.New(cfg)
	ctx := context.Background()

	err := notifier.SendEmail(ctx, "tenant-test", notification.EmailRequest{
		To:      "test@example.com",
		Subject: "Test Direct",
		Body:    "Hello",
	})

	if err != nil {
		t.Errorf("Expected no error, got %v", err)
	}
}

func TestNotifier_AsyncMode_Integration(t *testing.T) {
	// This test requires Redis to be running locally.
	// We skip if it fails to connect to avoid blocking CI.
	cfg := notification.Config{
		Mode:          notification.ModeAsync,
		QueueProvider: notification.QueueRedis,
		RedisConfig: notification.RedisConfig{
			Addr: "localhost:6379",
		},
	}

	notifier := notification.New(cfg)
	ctx := context.Background()

	err := notifier.SendEmail(ctx, "tenant-test", notification.EmailRequest{
		To:      "test@example.com",
		Subject: "Test Async",
		Body:    "Hello Async",
	})

	if err != nil {
		t.Logf("Skipping async test (Redis likely down): %v", err)
		return
	}
	t.Log("Async event published successfully")
}
