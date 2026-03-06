package provider

import (
	"context"
	"fmt"
	"net/smtp"
	"notification-service/internal/model"
)

type smtpProvider struct {
	host     string
	port     int
	username string
	password string
	from     string
}

func NewSMTPProvider(host string, port int, username, password, from string) EmailProvider {
	return &smtpProvider{
		host:     host,
		port:     port,
		username: username,
		password: password,
		from:     from,
	}
}

func (s *smtpProvider) SendEmail(ctx context.Context, req model.EmailRequest) error {
	auth := smtp.PlainAuth("", s.username, s.password, s.host)
	addr := fmt.Sprintf("%s:%d", s.host, s.port)
	msg := []byte(fmt.Sprintf("To: %s\r\nSubject: %s\r\n\r\n%s\r\n", req.To, req.Subject, req.Body))

	// In a real implementation, we should respect the context
	// But standard net/smtp doesn't support context.
	// We could use a different library later.
	return smtp.SendMail(addr, auth, s.from, []string{req.To}, msg)
}
