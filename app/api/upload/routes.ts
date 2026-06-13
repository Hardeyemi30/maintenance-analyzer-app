import { NextRequest, NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const connectionString =
      process.env.AZURE_STORAGE_CONNECTION_STRING!;

    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);

    const containerClient =
      blobServiceClient.getContainerClient(
        "maintenance-images"
      );

    // Create unique filename
    const uniqueFileName = `${uuidv4()}-${file.name}`;

    const blockBlobClient =
      containerClient.getBlockBlobClient(uniqueFileName);

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    await blockBlobClient.uploadData(buffer);

    return NextResponse.json({
      success: true,
      imageUrl: blockBlobClient.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}