import prisma from "@/lib/db";
import PostContent from "./components/PostContent";
import Link from "next/link";
import getCurrentUser from "@/actions/current-user";
import { PiWarning } from "react-icons/pi";
import { cn } from "@/lib/utils";
interface PostPageProps {
  params: { pathName: string };
}

const PostPage = async ({ params }: PostPageProps) => {
  const curr_user = await getCurrentUser()
  const post = await prisma.post.findUnique({
    where: {
      pathName: params.pathName,
    },
    include: {
      user: true,
      comments: true,
    }
  });
  if (!post || !post.isApproved && curr_user?.id != post.userId || post.isArchived) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
        <Link href="/">
          <p className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go to Home
          </p>
        </Link>
      </div>
    )
  }



  return (
    <div className="flex flex-col w-full p-6 space-y-4  ">
      {!post.isApproved && curr_user?.id == post.userId && (
        <div className="flex w-full items-center justify-center">

        <div className="flex items-center gap-x-4 bg-yellow-500/10 dark:bg-yellow-500/30 w-fit rounded-md px-4 py-2">
          <div className={cn("p-2 w-fit rounded-md", 'bg-yellow-500/10 dark:bg-yellow-500/30')}>
            <PiWarning className={cn("w-8 h-8", 'bg-yellow-400')} />
          </div>
          <div className="font-semibold">Your post has yet to be approved by a moderator. Only you can see it for now!</div>
        </div>
        </div>
      )}
      {/* @ts-ignore */}
      <PostContent post={post} />
    </div>
  )
};

export default PostPage;
