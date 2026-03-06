# 🚀 Notification SDK - Usage & Testing Guide

This folder contains a platform-grade Notification SDK and Worker implementation.

## 🛠 Prerequisites
- **Go 1.21+**
- **Redis** (Required for Async Mode)
  - You can start it via Docker: `docker run -d -p 6379:6379 redis`

---

## 🏗 How to Run Tests

### 1. Run Unit Tests
This will test the Direct Mode (Mock) and basic SDK logic.
```bash
go test -v ./...
```

### 2. Run the Example Application
This sends one email via **Direct Mode** and one via **Async Mode**.
```bash
go run examples/main.go
```

---

## 🤖 Running the Worker (Async Mode)
To see the SDK actually "working" in production mode:

1. **Start Redis** (if not already running).
2. **Start the Worker** in one terminal:
   ```bash
   go run cmd/worker/main.go
   ```
3. **Run the Example** in another terminal:
   ```bash
   go run examples/main.go
   ```
4. **Observe the Worker log**: You will see it receive the event and "send" the notification.

---

## 📂 Implementation Details

### Modes of Operation
- **Direct Mode**: The SDK sends the notification immediately using the configured provider (SMTP/Mock).
- **Async Mode**: The SDK publishes a `NotificationEvent` to the queue (Redis/RabbitMQ). A separate Worker service picks it up.

### Adding a New Provider
1. Define the interface in `internal/provider/provider.go`.
2. Implement it (e.g., `internal/provider/twilio.go`).
3. Register it in `notifier.go` inside the `New()` function.

### Multi-Tenancy
Every request requires a `tenantID`. This allows the Worker to:
- Apply per-tenant rate limits.
- Use different SMTP credentials for different clients.
- Log/Track usage per tenant.

---

## 🔥 Enterprise Features (To be added)
- [ ] **Dead Letter Queue (DLQ)**: For tracking failed notifications.
- [ ] **Exponential Backoff**: For retrying failed SMTP calls.
- [ ] **Template Engine**: Support for HTML email templates.
- [ ] **Circuit Breaker**: To stop trying providers when they are down.
