import getCurrentUser from "@/actions/current-user";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    //console.log('hello')
    const currentUser = await getCurrentUser()
    if (currentUser){
      return new NextResponse('Error', {status:500})
    }

    let image_url = null
    const body = await req.json()
    const {email, password, username, name, imageUrl} = body;
    if (!email || !password || !username || !name) {
      return new NextResponse('Missing parameters', {status:400})
    }


    if (imageUrl?.length > 50){
      image_url = body.imageUrl
    }


    const oldUser = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: username
          },
          {
            email: email
          }
        ]
      }
    })

    if (oldUser.length > 0){
      return new NextResponse('A user with the same username/email already exists', {status:400})
    }

    //console.log('hello')
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const newUser = await prisma.user.create({
      data:{
        username: username,
        hashedPassword: hashedPassword,
        email: email,
        profilePicture: image_url,
        name: name
      }
    })

    return NextResponse.json({status:200, id: newUser.id, username:newUser.username})
    
  }catch (error){
    console.log(error)
    return new NextResponse('Internal Server Error', {status:500})
  }
}


export async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser){
      return new NextResponse('Unauthorized', {status:403})
    }

    let image_url = null
    const body = await req.json()
    const {email, username, name, imageUrl} = body;
    if (!email || !username || !name || !imageUrl) {
      return new NextResponse('Missing parameters', {status:400})
    }


    if (imageUrl.length > 50){
      image_url = body.imageUrl
    }


    const oldUser = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      }
    })

    if (!oldUser) {
      return new NextResponse('User not found', {status:400})
    }

    


    return NextResponse.json({status:200})
    
  }catch (error){
    console.log(error)
    return new NextResponse('Internal Server Error', {status:500})
  }
}


