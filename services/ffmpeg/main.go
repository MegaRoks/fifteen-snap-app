package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/exec"
)

type Request struct {
	FileName string `json:"fileName"`
}

type Response struct {
	FileName string `json:"fileName"`
}

func convertVideo(w http.ResponseWriter, r *http.Request) {
	var req Request

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil || req.FileName == "" {
		http.Error(w, "Invalid JSON or missing fileName", http.StatusBadRequest)
		return
	}

	inputFile := "/videos/" + req.FileName
	outputFile := "/videos/output_" + req.FileName

	fmt.Printf("🎬 Starting conversion:\nInput: %s\nOutput: %s\n", inputFile, outputFile)

	cmd := exec.Command(
		"ffmpeg",
		"-i", inputFile,
		"-vf", "scale=1280:-2",
		"-c:v", "libx264",
		"-crf", "24",
		"-preset", "medium",
		"-c:a", "aac",
		"-b:a", "128k",
		"-movflags", "+faststart",
		outputFile,
	)

	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		fmt.Printf("❌ FFmpeg failed: %v\n", err)
		http.Error(w, "Video conversion failed", http.StatusInternalServerError)
		return
	}

	fmt.Println("✅ Conversion successful")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(Response{FileName: outputFile})
}

func main() {
	port := os.Getenv("FFMPEG_PORT")
	if port == "" {
		fmt.Println("❌ Error: FFMPEG_PORT is not set")
		os.Exit(1)
	}

	fmt.Printf("🚀 Server running on port %s...\n", port)
	http.HandleFunc("/convert", convertVideo)
	http.ListenAndServe(":"+port, nil)
}
