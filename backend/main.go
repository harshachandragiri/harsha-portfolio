package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"notification-service"

	"github.com/joho/godotenv"
)

type ContactForm struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Subject string `json:"subject"`
	Message string `json:"message"`
}

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, relying on environment variables.")
	}

	// Get config from env
	smtpPort := os.Getenv("SMTP_PORT")
	if smtpPort == "" {
		smtpPort = "587" // default
	}
	port := 587
	fmt.Sscanf(smtpPort, "%d", &port)

	// Initialize Notification SDK
	cfg := notification.Config{
		Mode:          notification.ModeDirect,
		EmailProvider: notification.ProviderSMTP,
		SMTPConfig: notification.SMTPConfig{
			Host:     os.Getenv("SMTP_HOST"),
			Port:     port,
			Username: os.Getenv("SMTP_USER"),
			Password: os.Getenv("SMTP_PASS"),
			From:     os.Getenv("SMTP_FROM"),
		},
	}
	notifier := notification.New(cfg)

	http.HandleFunc("/api/contact", func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			return
		}

		if r.Method != "POST" {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var form ContactForm
		if err := json.NewDecoder(r.Body).Decode(&form); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// Send Email to you (the owner)
		emailReq := notification.EmailRequest{
			To:      "chandragiriharshavardhan@gmail.com",
			Subject: fmt.Sprintf("Portfolio Contact: %s - %s", form.Name, form.Subject),
			Body: fmt.Sprintf(
				"Name: %s\nEmail: %s\nPhone: %s\n\nMessage:\n%s",
				form.Name, form.Email, form.Phone, form.Message,
			),
		}

		err := notifier.SendEmail(context.Background(), "portfolio", emailReq)
		if err != nil {
			log.Printf("Error sending email: %v", err)
			http.Error(w, "Error processing contact request", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"status": "success"})
	})

	http.HandleFunc("/api/ai", handleAIRequest)

	// Serve static files from the frontend/dist directory
	frontendDir := "../frontend/dist"
	fs := http.FileServer(http.Dir(frontendDir))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Clean the path to prevent directory traversal
		cleanPath := filepath.Clean(r.URL.Path)
		fullPath := filepath.Join(frontendDir, cleanPath)

		// Check if file exists and is not a directory
		info, err := os.Stat(fullPath)
		if err == nil && !info.IsDir() {
			fs.ServeHTTP(w, r)
			return
		}

		// Otherwise serve index.html (Standard SPA routing)
		http.ServeFile(w, r, filepath.Join(frontendDir, "index.html"))
	})

	fmt.Println("Backend server starting on :8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

type AIRequest struct {
	Question string `json:"question"`
}

type AIResponse struct {
	Answer string `json:"answer"`
}

// The portfolioKnowledge variable is no longer used directly as knowledge is read from knowledge.json
var _ = `You are the AI assistant for Harshavardhan's portfolio.
Harshavardhan is a Full Stack + AI Engineer with 1 year of experience.
Skills: React, Tailwind CSS, Framer Motion, Node.js, Express, Python, Flask, FastAPI, Go, MongoDB, PostgreSQL, LLMs, RAG, LangChain, Vector DBs (ChromaDB), Docker, Git, AWS.
Projects:
1. RAG-based Document Summarization System
2. AI-powered Chat Application with LLM integration
3. Conversational Query SDK that converts natural language to MongoDB queries.
He is startup-ready, meaning he can build 0->1, from requirement analysis, DB schema, API design, auth systems (JWT), AI integration layers, to deployment.
He thinks in products, not tasks, and designs for scale from day one.
Answer user questions based ONLY on this knowledge. If the question is entirely unrelated to Harsha, his skills, or his projects, politely decline to answer and say "I can only answer questions about Harsha's portfolio and experience."
Be concise, professional, and friendly. Use formatting like bullet points or bold text where appropriate.`

func handleAIRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req AIRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	apiKey := os.Getenv("GROQ_API_KEY")
	if apiKey == "" {
		http.Error(w, "GROQ_API_KEY is not set", http.StatusInternalServerError)
		return
	}

	execPath, err := os.Executable()
	var knowledgePath string
	if err == nil {
		knowledgePath = filepath.Join(filepath.Dir(execPath), "knowledge.json")
	} else {
		knowledgePath = "knowledge.json"
	}

	if _, err := os.Stat(knowledgePath); os.IsNotExist(err) {
		knowledgePath = "knowledge.json" // Fallback to current working directory
	}

	knowledgeBytes, err := os.ReadFile(knowledgePath)
	if err != nil {
		log.Printf("Error reading knowledge.json: %v", err)
		http.Error(w, "Error reading portfolio knowledge", http.StatusInternalServerError)
		return
	}

	// Prepare request to Groq
	groqReqBody := map[string]interface{}{
		"model": "llama-3.3-70b-versatile",
		"messages": []map[string]string{
			{"role": "system", "content": string(knowledgeBytes)},
			{"role": "user", "content": req.Question},
		},
		"temperature": 0.3,
	}

	jsonData, err := json.Marshal(groqReqBody)
	if err != nil {
		http.Error(w, "Error marshaling request", http.StatusInternalServerError)
		return
	}

	groqReq, err := http.NewRequest("POST", "https://api.groq.com/openai/v1/chat/completions", bytes.NewBuffer(jsonData))
	if err != nil {
		http.Error(w, "Error creating request", http.StatusInternalServerError)
		return
	}

	groqReq.Header.Set("Authorization", "Bearer "+apiKey)
	groqReq.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(groqReq)
	if err != nil {
		http.Error(w, "Error calling Groq API", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Error reading response", http.StatusInternalServerError)
		return
	}

	if resp.StatusCode != http.StatusOK {
		log.Printf("Groq API error: %s", string(bodyBytes))
		http.Error(w, "Groq API error", http.StatusInternalServerError)
		return
	}

	var groqResp struct {
		Choices []struct {
			Message struct {
				Content string `json:"content"`
			} `json:"message"`
		} `json:"choices"`
	}

	if err := json.Unmarshal(bodyBytes, &groqResp); err != nil {
		http.Error(w, "Error parsing Groq response", http.StatusInternalServerError)
		return
	}

	if len(groqResp.Choices) == 0 {
		http.Error(w, "No answer from Groq", http.StatusInternalServerError)
		return
	}

	answer := groqResp.Choices[0].Message.Content

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(AIResponse{Answer: answer})
}
