package model

import "time"

type NotificationEvent struct {
	ID        string      `json:"id"`
	TenantID  string      `json:"tenant_id"`
	Type      string      `json:"type"` // email, sms, otp
	Payload   interface{} `json:"payload"`
	Timestamp time.Time   `json:"timestamp"`
}
