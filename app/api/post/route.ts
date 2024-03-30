import prisma from "@/lib/db";
import { Tag } from "@prisma/client";
import { generatePathname, parseTags } from "@/lib/utils";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/current-user";


export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user ) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    if (user.role == 'USER'){
      return new NextResponse("You are not authorized to publish posts! Please contact an admin for editor status.", { status: 403 });
    }
    const body = await req.json();
    //console.log(body)
    const { content, coverImage, title, description, json } = body;
    if ( !title || !coverImage || !description || !content) {
      return new NextResponse("Missing Parameters", { status: 400 });
    }
    const tags: string[] = parseTags(body.tags);
    const pathName = generatePathname(title);
    const isApproved = true;
    
    const oldPost = await prisma.post.findUnique({
      where: {
        pathName: pathName,
        userId: user?.id,
      },
    });

    if (oldPost) {
      return new NextResponse("A post already exists with this title", {
        status: 400,
      });
    }

    const newPost = await prisma.post.create({
      data: {
        //json: body.json,
        description: body.description,
        coverImage: body.coverImage,
        title: body.title,
        content: body.content,
        userId: user.id,
        pathName: pathName,
        isApproved: isApproved,
        
      },
    });
    const tagz = await Promise.all(tags.map(async (tagName) => {
      return prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      });
    }));


    await prisma.post.update({
      where: { id: newPost.id },
      data: {
        tags: {
          connect: tagz.map((tag) => ({ id: tag.id })),
        },
      },
    });


    return NextResponse.json(
      {
        success: true,
        pathName: pathName,
      },
      { status: 200 }
    );
  } catch (error : any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    // Auth check for userId = session.userId
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const body = await req.json();
    const { postId } = body;
    if (!postId) {
      return new NextResponse("Missing Parameters", { status: 400 });
    }
    await prisma.post.update({
      where: {
        userId: user.id,
        id: postId,
      },
      data:{
        isArchived: true
      }
    });
    return NextResponse.json(
      {
        success: true,
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

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const body = await req.json();
    let { tags, postId, content, title } = body;
    if (!content || !postId || !title || !tags) {
      return new NextResponse("Missing Parameters", { status: 400 });
    }

    postId = parseInt(postId);
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        tags: true,
      },
    });
    if (!post) {
      return new NextResponse("Invalid Post", { status: 400 });
    }
    const updatedTags: string[] = body.tags || [];
    const currentTags = post.tags.map((tag) => tag.name);
    const tagsToAdd = updatedTags.filter((tag) => !currentTags.includes(tag));
    const tagsToRemove = currentTags.filter(
      (tag) => !updatedTags.includes(tag)
    );

    const updatedPost = await prisma.post.update({
      where: {
        id: body.postId,
      },
      data: {
        content: body.content,
        title: body.title,
        tags: {
          connectOrCreate: tagsToAdd.map((tagName) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
          disconnect: tagsToRemove.map((tagName) => ({ name: tagName })),
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
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
