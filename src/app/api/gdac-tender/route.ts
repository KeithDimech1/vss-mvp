import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Retrieve the GDAC tender tracker data
export async function GET() {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has access (managers, admins, or specific users)
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { isManager: true, role: true, username: true },
    });

    // Allow access for managers, admins, or specific usernames
    const allowedUsernames = ['qusay'];
    const hasAccess = user?.isManager || user?.role === "ADMIN" || allowedUsernames.includes(user?.username?.toLowerCase() || '');

    if (!hasAccess) {
      return NextResponse.json(
        { error: "Access denied. You do not have permission to view this page." },
        { status: 403 }
      );
    }

    // Get or create the single tracker record
    let tracker = await prisma.gdacTenderTracker.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!tracker) {
      tracker = await prisma.gdacTenderTracker.create({
        data: {
          lastUpdatedById: session.userId,
        },
      });
    }

    return NextResponse.json({ tracker });
  } catch (error) {
    console.error("Error fetching GDAC tender tracker:", error);
    return NextResponse.json(
      { error: "Failed to fetch tracker data" },
      { status: 500 }
    );
  }
}

// PUT - Update the GDAC tender tracker
export async function PUT(request: Request) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has access (managers, admins, or specific users)
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { isManager: true, role: true, username: true },
    });

    // Allow access for managers, admins, or specific usernames
    const allowedUsernames = ['qusay'];
    const hasAccess = user?.isManager || user?.role === "ADMIN" || allowedUsernames.includes(user?.username?.toLowerCase() || '');

    if (!hasAccess) {
      return NextResponse.json(
        { error: "Access denied. You do not have permission to edit this page." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Tracker ID is required" },
        { status: 400 }
      );
    }

    // Update the tracker
    const tracker = await prisma.gdacTenderTracker.update({
      where: { id },
      data: {
        ...updateData,
        lastUpdatedById: session.userId,
      },
    });

    return NextResponse.json({ tracker });
  } catch (error) {
    console.error("Error updating GDAC tender tracker:", error);
    return NextResponse.json(
      { error: "Failed to update tracker data" },
      { status: 500 }
    );
  }
}
