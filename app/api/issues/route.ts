import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body); // Validate the request body against the schema
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { title, description } = body;
  try {
    const issue = await prisma.issue.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json(issue, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
