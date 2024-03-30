import getCurrentUser from "@/actions/current-user";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    // Auth check for userId = session.userId
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const body = await req.json();
    const { text, postId} = body;
    if (!text || !postId) {
      return new NextResponse("Missing Parameters", { status: 400 });
    }
    

    const newComment = await prisma.comment.create({
      data: {
        text: text,
        postId: postId,
        userId: user.id
      },
    });

    return NextResponse.json(
      {
        success: true,
        text: text,
        post_id: postId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}
