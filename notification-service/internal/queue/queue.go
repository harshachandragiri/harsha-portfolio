package queue

import (
	"context"
	"notification-service/internal/model"
)

type Queue interface {
	Publish(ctx context.Context, event model.NotificationEvent) error
	Subscribe(ctx context.Context, handler func(model.NotificationEvent) error) error
}
