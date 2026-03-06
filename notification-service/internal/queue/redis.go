package queue

import (
	"context"
	"encoding/json"
	"notification-service/internal/model"

	"github.com/redis/go-redis/v9"
)

type redisQueue struct {
	client *redis.Client
	key    string
}

func NewRedisQueue(addr string, password string, db int, key string) Queue {
	client := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: password,
		DB:       db,
	})
	return &redisQueue{
		client: client,
		key:    key,
	}
}

func (r *redisQueue) Publish(ctx context.Context, event model.NotificationEvent) error {
	data, err := json.Marshal(event)
	if err != nil {
		return err
	}
	return r.client.LPush(ctx, r.key, data).Err()
}

func (r *redisQueue) Subscribe(ctx context.Context, handler func(model.NotificationEvent) error) error {
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
			res, err := r.client.BRPop(ctx, 0, r.key).Result()
			if err != nil {
				continue
			}
			var event model.NotificationEvent
			if err := json.Unmarshal([]byte(res[1]), &event); err != nil {
				continue
			}
			_ = handler(event) // Handle error maybe log it
		}
	}
}
