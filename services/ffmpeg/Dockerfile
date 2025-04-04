FROM golang:latest AS builder

WORKDIR /app

COPY ./ ./

RUN go mod init myapp
RUN go mod tidy
RUN GOOS=linux GOARCH=amd64 go build -o ./myserver ./main.go

FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache ffmpeg

COPY --from=builder ./app/myserver ./myserver

CMD ["./myserver"]