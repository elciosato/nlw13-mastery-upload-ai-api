import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { createTranscriptRoute } from "./routes/create-transcription";
import { generateAiCompletionRoute } from "./routes/generate-ai-completion";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});
app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptRoute);
app.register(generateAiCompletionRoute);

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log("Server running on port:", 3000);
  });
