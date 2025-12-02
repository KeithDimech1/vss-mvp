import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readFile } from "fs/promises";
import path from "path";

// GET - Retrieve markdown content for a tender response form
export async function GET(request: Request) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json(
        { error: "filename parameter is required" },
        { status: 400 }
      );
    }

    // Security: Only allow specific filenames
    const allowedFiles = [
      "FORM-9.1-APPLICANT-INFORMATION.md",
      "FORM-9.2-TECHNICAL-ADMINISTRATIVE-CAPABILITIES.md",
      "FORM-9.3-ADMINISTRATIVE-STAFF-EXPERIENCE.md",
      "FORM-9.4-PROFESSIONAL-STAFF-EXPERIENCE.md",
      "FORM-9.5-SIMILAR-PROJECTS.md",
      "FORM-9.6-FINANCIAL-CAPACITY-CRITERIA.md",
    ];

    if (!allowedFiles.includes(filename)) {
      return NextResponse.json(
        { error: "Invalid filename" },
        { status: 400 }
      );
    }

    // Build path to the response files
    const filePath = path.join(
      process.cwd(),
      "src",
      "content",
      "tender-forms",
      filename
    );

    try {
      const content = await readFile(filePath, "utf-8");
      return NextResponse.json({ content });
    } catch (fileError) {
      console.error("Error reading file:", fileError);
      return NextResponse.json(
        { error: "File not found", content: "" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching tender content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}
