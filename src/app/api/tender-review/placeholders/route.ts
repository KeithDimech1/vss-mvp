import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Retrieve all placeholders for a form
export async function GET(request: Request) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const formId = searchParams.get("formId");

    const whereClause = formId ? { formId } : {};

    const placeholders = await prisma.tenderPlaceholder.findMany({
      where: whereClause,
      orderBy: { placeholderId: "asc" },
    });

    return NextResponse.json({ placeholders });
  } catch (error) {
    console.error("Error fetching placeholders:", error);
    return NextResponse.json(
      { error: "Failed to fetch placeholders" },
      { status: 500 }
    );
  }
}

// POST - Create or update a placeholder value
export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { formId, placeholderId, originalText, currentValue } = body;

    if (!formId || !placeholderId) {
      return NextResponse.json(
        { error: "formId and placeholderId are required" },
        { status: 400 }
      );
    }

    // Upsert the placeholder
    const placeholder = await prisma.tenderPlaceholder.upsert({
      where: {
        formId_placeholderId: {
          formId,
          placeholderId,
        },
      },
      update: {
        currentValue: currentValue || originalText,
        lastEditedById: session.userId,
        lastEditedAt: new Date(),
      },
      create: {
        formId,
        placeholderId,
        originalText: originalText || currentValue,
        currentValue: currentValue || originalText,
        lastEditedById: session.userId,
      },
    });

    return NextResponse.json({ placeholder });
  } catch (error) {
    console.error("Error saving placeholder:", error);
    return NextResponse.json(
      { error: "Failed to save placeholder" },
      { status: 500 }
    );
  }
}
