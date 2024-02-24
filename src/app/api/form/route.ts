import { NextResponse } from "next/server";
import formDraft from "@/app/db/form";

export const runtime = "edge";

export async function GET(req: Request) {
  return new NextResponse(JSON.stringify(formDraft, null, 2), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
