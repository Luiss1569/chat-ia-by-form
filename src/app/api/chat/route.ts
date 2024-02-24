import OpenAI from "openai";
import { NextResponse } from "next/server";
import interviewPrompt from "@/app/prompts/interview";
import Form from "@/app/models/Form";

// Create an OpenAI API client (edge-friendly)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const form = new Form();

// Set runtime to edge for optimal performance
export const runtime = "edge";

export async function GET(req: Request) {
  return new NextResponse("Hello");
}

type IMessage = OpenAI.ChatCompletionCreateParams["messages"][0];

// Define the context for conversation
const interviewContext = (form: Form, error?: string): IMessage => {
  const prompt: IMessage = {
    name: "context",
    role: "system",
    content: ` 
  ${interviewPrompt} 
  Engage in conversation with the user. If the conversation has already been concluded, notify that the interaction has ended, express gratitude to the user, and bid farewell courteously.
  JSON:
  ${JSON.stringify(form.formDraft(), null, 2)}
  `,
  };

  if (error) {
    prompt.content += `\nUser answer invalid: ${error}`;
  }

  return prompt;
};

const helpContext = (form: Form, firstContact: true): IMessage => {
  const prompt: IMessage = {
    name: "context",
    role: "system",
    content: `
    Engage in conversation with the user. If the conversation has already been concluded, notify that the interaction has ended, express gratitude to the user, and bid farewell courteously and request current field.
    JSON:
    ${JSON.stringify(form.formDraft(), null, 2)}
    `,
  };

  if (firstContact) {
    prompt.content += `\nWelcome the user, introduce yourself, and provide the context of the form they will be responding to. `;
  }

  return prompt;
};

export async function POST(req: Request) {
  const { messages, type } = (await req.json()) as {
    messages: IMessage[];
    type: "answer" | "help";
  };

  const lastMessage = messages.at(-1) as IMessage;
  let prompt: IMessage | null = null;

  if (lastMessage.role === "user" && messages?.length > 1) {
    if (type === "help") {
      prompt = interviewContext(form);
    } else {
      if (typeof lastMessage.content === "string") {
        const { success, message } = form.addAnswer(lastMessage.content);

        if (success) {
          form.nextQuestion();
        } else {
          prompt = interviewContext(form, message);
        }
      }
    }
  }

  if (!prompt) {
    prompt = helpContext(form, true);
  }

  console.log(JSON.stringify(form, null, 2));

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    model: "gpt-3.5-turbo",
    messages: [prompt, ...messages],
    max_tokens: 200,
  };

  const response = await openai.chat.completions.create(params);

  return new NextResponse(response.choices[0].message.content);
}
