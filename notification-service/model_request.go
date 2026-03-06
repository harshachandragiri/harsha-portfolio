package notification

type EmailRequest struct {
	To      string
	Subject string
	Body    string
	Data    map[string]interface{} // For templates
}

type SMSRequest struct {
	To      string
	Message string
}

type OTPRequest struct {
	To     string
	Code   string
	Method string // email or sms
}
