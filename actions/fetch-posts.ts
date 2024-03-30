'use server'


import prisma from "@/lib/db";
import { posts } from "@/dummy"

export async function getAllPosts(tag?: string, searchTerm : string = ""){
    let cur_posts;
    if (tag) {
        cur_posts = await prisma.post.findMany({
            where: {
                tags: {
                    some: {
                        name: tag 
                    }
                },
                OR: [
                    { title: { contains: searchTerm } },
                    { content: { contains: searchTerm } }
                ]
            },
            include:{
                user:true,
                tags:true,
            },
            orderBy: {
                createdAt: 'desc',
              },
        });
    } else {
        cur_posts = await prisma.post.findMany({
            include:{
                user:true,
                tags:true
            },
            where:{
                OR: [
                    { title: { contains: searchTerm } },
                    { content: { contains: searchTerm } }
                ]
            },
            orderBy: {
                createdAt: 'desc',
              },
        });
    }

    return cur_posts
}