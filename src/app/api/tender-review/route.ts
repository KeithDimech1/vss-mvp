import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Retrieve all comments for a form or all comments
export async function GET(request: Request) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const formId = searchParams.get("formId");

    const whereClause = formId ? { formId } : {};

    const comments = await prisma.tenderReviewComment.findMany({
      where: whereClause,
      include: {
        reviewer: {
          select: {
            id: true,
            fullName: true,
            username: true,
          },
        },
      },
      orderBy: [
        { formId: "asc" },
        { sectionId: "asc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Error fetching tender review comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// POST - Create or update a comment
export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { formId, sectionId, comment, status } = body;

    if (!formId || !sectionId || !comment) {
      return NextResponse.json(
        { error: "formId, sectionId, and comment are required" },
        { status: 400 }
      );
    }

    // Upsert the comment (create or update based on unique constraint)
    const reviewComment = await prisma.tenderReviewComment.upsert({
      where: {
        formId_sectionId_reviewerId: {
          formId,
          sectionId,
          reviewerId: session.userId,
        },
      },
      update: {
        comment,
        status: status || "PENDING",
      },
      create: {
        formId,
        sectionId,
        comment,
        status: status || "PENDING",
        reviewerId: session.userId,
      },
      include: {
        reviewer: {
          select: {
            id: true,
            fullName: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json({ comment: reviewComment });
  } catch (error) {
    console.error("Error saving tender review comment:", error);
    return NextResponse.json(
      { error: "Failed to save comment" },
      { status: 500 }
    );
  }
}

// PUT - Update comment status (for managers/admins to mark as addressed/resolved)
export async function PUT(request: Request) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "id and status are required" },
        { status: 400 }
      );
    }

    // Verify valid status
    const validStatuses = ["PENDING", "ADDRESSED", "RESOLVED", "WONT_FIX"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const reviewComment = await prisma.tenderReviewComment.update({
      where: { id },
      data: { status },
      include: {
        reviewer: {
          select: {
            id: true,
            fullName: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json({ comment: reviewComment });
  } catch (error) {
    console.error("Error updating tender review comment:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a comment (only the reviewer can delete their own comment)
export async function DELETE(request: Request) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Comment id is required" },
        { status: 400 }
      );
    }

    // Verify the comment belongs to the user (or user is admin)
    const existingComment = await prisma.tenderReviewComment.findUnique({
      where: { id },
    });

    if (!existingComment) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    // Check if user is admin or the comment owner
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { role: true },
    });

    if (existingComment.reviewerId !== session.userId && user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You can only delete your own comments" },
        { status: 403 }
      );
    }

    await prisma.tenderReviewComment.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tender review comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
