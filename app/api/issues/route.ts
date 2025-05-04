import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body); // Validate the request body against the schema
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

export async function GET(request: NextRequest) {
  try {
    const issues = await prisma.issue.findMany();
    return NextResponse.json(issues, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
