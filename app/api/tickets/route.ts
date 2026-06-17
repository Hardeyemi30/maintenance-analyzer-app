import { NextRequest, NextResponse } from "next/server";
import { container } from "../../lib/cosmo";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const { resource } =
      await container.items.create(body);

    return NextResponse.json(resource);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save ticket" },
      { status: 500 }
    );
  }
}