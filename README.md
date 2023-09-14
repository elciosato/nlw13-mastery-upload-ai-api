# Upload AI API

Backend API developed during NLW AI Mastery event by Rocketseat.


## Overview

The Backend application is tightly integrated with the [Frontend](https://github.com/elciosato/nlw13-mastery-upload-ai-web) application, serving as the core processing unit. The primary responsibility is to facilitate the uploading of audio MP3 files to the server and subsequently processing these file to generate accurate transcriptions. Beyond this fundamental functionality, the application offers the automatic generation of YouTube video titles and descriptions, leveraging the transcriptions generated earlier.

## Installation

You will need to have an account in [openai.com](https://openai.com) and create an [api key](https://platform.openai.com/account/api-keys)

```bash
# Clone the repository
git clone https://github.com/elciosato/nlw13-mastery-upload-ai-api.git

# Install dependencies
cd nlw13-mastery-upload-ai-api/
pnpm install

# Create the .env file
DATABASE_URL="file:./dev.db"
OPENAI_KEY="your OpenAI key"

# Sync the database objects
pnpm prisma migrate dev

# Startup the server
pnpm run dev
```

## Usage

Install the REST Client vscode plugin and test the endpoints:

```bash
# @name get-prompts
GET http://localhost:3000/prompts

###

# @name upload-video
POST http://localhost:3000/videos
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="example.mp3"
Content-Type: audio/mpeg

< ./example.mp3
------WebKitFormBoundary7MA4YWxkTrZu0gW--

###

# @name create-transcription
POST http://localhost:3000/videos/5070abda-8b3b-49c2-96c8-26711322830d/transcription
Content-Type: application/json

{
  "prompt": "saúde, século 21"
}

###

# @name generate-ai-completion
POST http://localhost:3000/ai/complete
Content-Type: application/json

{
  "videoId": "5070abda-8b3b-49c2-96c8-26711322830d",
  "temperature": 0.5,
  "prompt": "Gere um resumo sucinto da transcrição do vídeo informada a seguir '''{transcription}'''"
}
```