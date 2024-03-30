import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const maxFileSize = 10 * 1024 * 1024; 
    
    // Check file size
    const contentLength = Number(req.headers.get("content-length"));
    if (contentLength > maxFileSize) {
      return NextResponse.json(
        {
          success: false,
          message: "File size too large",
        },
        { status: 400 }
      );
    }

    const body = await req.arrayBuffer();
    
    // Check if the file content is an image 
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Uploaded file is not an image",
        },
        { status: 400 }
      );
    }

    const dataUrl = `data:${contentType};base64,${Buffer.from(body).toString("base64")}`;
    //console.log("Data URL of the uploaded image:", dataUrl);

    return NextResponse.json(
      {
        success: true,
        url: dataUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing file upload:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing the file upload",
      },
      { status: 500 }
    );
  }
}
