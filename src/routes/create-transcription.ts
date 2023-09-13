import { FastifyInstance } from "fastify";
import { createReadStream } from "node:fs";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { openai } from "../lib/openai";

export async function createTranscriptRoute(app: FastifyInstance) {
  app.post("/videos/:videoId/transcription", async (request, reply) => {
    const transcriptionParamsSchema = z.object({
      videoId: z.string().uuid(),
    });

    const { videoId } = transcriptionParamsSchema.parse(request.params);

    const transcriptionBodySchema = z.object({
      prompt: z.string(),
    });

    const { prompt } = transcriptionBodySchema.parse(request.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    });

    const audioReadStream = createReadStream(video.path);

    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: "whisper-1",
      language: "pt",
      response_format: "json",
      temperature: 0,
      prompt,
    });

    const transcription = response.text;

    await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        transcription,
      },
    });
    return { transcription };
  });
}
