'use server'
import prisma from "@/lib/db";
import getSession from "./get-session";





const getCurrentUser = async () => {
  try {
    const session = await getSession();
    //console.log(session);
    // @ts-ignore
    if (!session?.user?.username) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      // @ts-ignore
      where: {
        // @ts-ignore
        username: session.user.username as string,
      },
      include: {
        posts: true,
        comments: {
          include: {
            user: true, post: true
          }
        },
       
      }
    });

    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;