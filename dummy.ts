import { Prisma } from "@prisma/client";

export interface Post{
    imageUrl: string;
    title: string;
    author: string;
    description?: string
    pathName : string;
    
    tags? : string[]
}

export type User = Prisma.UserGetPayload<{
    include: {comments: {include: {
        user: true, post: true, likes: true, replies: true
    }}, posts: true, likes : true }
  }>

  export type PPost = Prisma.PostGetPayload<{
    include: {comments: true,  likes : true, user: true }
  }>



export type Comment = Prisma.CommentGetPayload<{
    include: {user: true, post: true, likes: true, replies: true}
  }>

  export const posts: Post[] = [
    {
      imageUrl: '/prisma.jpeg',
      title: 'Working with Prisma Tutorial',
      author: 'Joshua Solo',
      description: 'Learn how to work with Prisma ORM in this comprehensive tutorial.',
      tags: ['#tutorial'],
      pathName: '/prisma-tutorial'
    },
    {
      imageUrl: '/prisma.jpeg',
      title: 'Working with Prisma Tutorial',
      author: 'Joshua Solo',
      description: 'Learn how to work with Prisma ORM in this comprehensive tutorial.',
      tags: ['#tutorial'],
      pathName: '/prisma-tutorial'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5zdGFncmFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      title: 'Growing Your Instagram',
      author: 'Joshua Solo',
      description: 'Discover strategies to grow your Instagram account and engage with your audience effectively.',
      tags: ['#instagram', '#non-coding'],
      pathName: '/grow-instagram'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHl0aG9uJTIwcHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
      title: 'Flask Python Tutorial',
      author: 'Joshua Solo',
      description: 'Learn how to build web applications with Flask, a lightweight Python web framework.',
      tags: ['#tutorial','#python'],
      pathName: '/flask-python-tutorial'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2Fhc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
      title: 'Starting Your First SaaS',
      author: 'Joshua Solo',
      description: 'Get started with building your first Software as a Service (SaaS) product.',
      tags: ['#tutorial', '#money🤑'],
      pathName: '/saas-startup'
    },
    {
      imageUrl: '/java.png',
      title: 'OOP in Java',
      author: 'Joshua Solo',
      description: 'Learn Object-Oriented Programming concepts in Java programming language.',
      tags: ['#tutorial', '#java'],
      pathName: '/java-oop'
    },
    {
      imageUrl: '/Thanks-nextJS.jpeg',
      title: 'Creating Next JS App',
      author: 'Joshua Solo',
      description: 'Build powerful web applications with Next.js, the React framework for production.',
      tags: ['#tutorial'],
      pathName: '/nextjs-app'
    },
  ];
  