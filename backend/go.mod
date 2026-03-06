module portfolio-backend

go 1.21.6

replace notification-service => ../notification-service

require (
	github.com/joho/godotenv v1.5.1
	notification-service v0.0.0
)

require (
	github.com/cespare/xxhash/v2 v2.3.0 // indirect
	github.com/dgryski/go-rendezvous v0.0.0-20200823014737-9f7001d12a5f // indirect
	github.com/redis/go-redis/v9 v9.17.3 // indirect
)
