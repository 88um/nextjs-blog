"use client";
import { formatDate } from "@/lib/utils";
import { EditorContent, useEditor, generateHTML} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiShare, FiEye } from "react-icons/fi";
import { BsBookmarkPlus } from 'react-icons/bs'
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { PPost } from "@/dummy";
import { contentExtensions, defaultExtensions} from "@/lib/default-extensions";
import { toast } from "sonner";

interface PostContentProps {
  post: PPost;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  // @ts-ignore
  const output = post.json ? generateHTML(post.json, [StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3 -mt-2",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3 -mt-2",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal -mb-2",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-stone-700",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class:
          "rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900",
        spellcheck: "false",
      },
    },
    code: {
      HTMLAttributes: {
        class:
          "rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900",
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    gapcursor: false,
  }),]) : post.content;
  const editor = useEditor({
    editable: false,
    content: output,
    extensions: contentExtensions,
  });

  const copyLink = async () => {
    try {
      const { href } = window.location;
      await navigator.clipboard.writeText(href);
      toast.info("Copied link to clipboard!");
    } catch (error) {
      toast.error('Failed to copy link: ' + error);
    }
  }

  return (
    <div className="lg:container  md:px-20 lg:px-40 pt-8">
      <div className="flex flex-col  gap-y-8">

        <h1 className="text-4xl font-bold capitalize font-serif">
          {post.title}
        </h1>
        <div className="flex w-full  py-3 justify-between border-b border-t border-dotted dark:border-solid dark:border-muted-foreground  items-center">
          <div className="flex space-x-2">
            <Avatar className="h-12 w-12 border-2  border-sky-500 dark:border-white  rounded-full ">
              <AvatarImage
                src={post.user.profilePicture ?? "/placeholder.jpg"}
                alt="@shadcn"
                className="rounded-full"
              />
            </Avatar>
            <div className="flex flex-col font-mono space-y-1">
              <h3 className="text-sm font-semibold  capitalize">
                <span className="text-xs text-muted-foreground lowercase">by {" "}</span>{post.user.name}
              </h3>
              <p className="hidden text-sm text-muted-foreground underline">
                @{post.user.username}
              </p>
              <p className="text-xs text-muted-foreground ">
                Published {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex  justify-center space-x-4 text-muted-foreground text-xl font-light group group:hover:cursor-pointer">


            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>

                  <button className="bg-transparent ">
                    <BsBookmarkPlus className="hover:cursor-pointer hover:text-indigo-600 transition-colors duration-300" />
                  </button>

                </TooltipTrigger>
                <TooltipContent className="bg-black text-white">
                  <p>Bookmark </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>

                  <button className="bg-transparent " onClick={copyLink}>
                    <FiShare className="hover:cursor-pointer hover:text-red-300 transition-colors duration-300" />
                  </button>

                </TooltipTrigger>
                <TooltipContent className="bg-black text-white">
                  <p>Share Post </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div className="mt-12 w-full flex flex-col  justify-center gap-y-6">
        <div className=" flex justify-center w-full ">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="border-2 rounded-md object-cover border-dashed dark:border-muted-foreground"
            />
          </AspectRatio>
        </div>

        <div className="hidden prose" dangerouslySetInnerHTML={{ __html: output }}></div>
        <div className="prose prose-lg  pt-5">
          <EditorContent editor={editor} className="dark:text-white mx-0 " />
        </div>
      </div>

    </div>
  );

};

export default PostContent;
