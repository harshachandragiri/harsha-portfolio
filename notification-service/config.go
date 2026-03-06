package notification

const (
	ModeDirect = "direct"
	ModeAsync  = "async"

	ProviderSMTP = "smtp"
	ProviderMock = "mock"

	QueueRedis    = "redis"
	QueueRabbitMQ = "rabbitmq"
)

type Config struct {
	Mode           string // "direct" or "async"
	QueueProvider  string // "redis" or "rabbitmq"
	EmailProvider  string // "smtp" or "mock"
	SMTPConfig     SMTPConfig
	RedisConfig    RedisConfig
	RabbitMQConfig RabbitMQConfig
}

type SMTPConfig struct {
	Host     string
	Port     int
	Username string
	Password string
	From     string
}

type RedisConfig struct {
	Addr     string
	Password string
	DB       int
}

type RabbitMQConfig struct {
	URL string
}
