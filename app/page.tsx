import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AiFillGithub, AiOutlineInstagram } from "react-icons/ai";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PostsList from "@/components/lists/PostsList";
import Link from "next/link";

import { getAllPosts } from "@/actions/fetch-posts";

export default async function Home() {
  const posts = await getAllPosts()
  return (
    <div className="container mx-auto pt-10 lg:px-20">
      <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:justify-between mb-16">
        <div className="flex flex-col space-y-4">
          <h1 className="font-bold text-xl">Joshua Solo</h1>
          <h2 className="text-muted-foreground font-medium text-lg ">
            Software Engineer
          </h2>
          <p className=" font-medium text-md">
            Welcome to my blog where I talk about pretty much anything. Of
            course this blog is mainly software focused but I occasionally drop
            some non-software nuggets. Follow me on IG{" "}
            <span className="inline-flex bg-neutral-100 dark:bg-neutral-800 border-2 dark:border-neutral-700 w-fit items-center p-1 rounded-md text-neutral-900 dark:text-white">
              <AiOutlineInstagram className="text-lg " />
              <a
                href="https://instagram.com/ulzi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-sm px-2 mb-1">@ulzi</span>
              </a>
            </span>
          </p>
        </div>
        <div className="relative  ">
          <Avatar className="h-[8rem] w-[8rem] border-2  border-sky-500 dark:border-white p-2 rounded-full ">
            <AvatarImage
              src="https://i1.sndcdn.com/artworks-G4s1eC0l7QRRhSOt-pGVyNA-t500x500.jpg"
              alt="@shadcn"
              className="rounded-full"
            />
          </Avatar>

          <p className="absolute bottom-0 left-24 md:right-0 text-4xl ">🖖</p>
        </div>
      </div>
      <div className="mb-16 rounded-md  bg-neutral-100 border border-neutral-700 dark:bg-neutral-800 text-neutral-900 dark:text-white">
        <Link href="https://github.com/88um" target="_blank">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center ">
              <div className="relative">
                <Avatar className="h-[5rem] w-[5rem] border-2   rounded-full ">
                  <AvatarImage
                    src="https://avatars.githubusercontent.com/u/97570113?v=4"
                    alt="@shadcn"
                    className="rounded-full"
                  />
                </Avatar>
                <div className="absolute z-66 bottom-0 right-0 p-1 rounded-full border-2 bg-white text-black ">
                  <AiFillGithub size={25} />
                </div>
              </div>

              <div className="pl-4 flex flex-col">
                <h1 className="font-bold text-lg">@88um</h1>
                <p className="text-muted-foreground text-md">Github Account</p>
              </div>
            </div>
            <ArrowUpRight />
          </div>
        </Link>
      </div>
      <div className="flex flex-col space-y-3 my-16">
        <h1 className="font-bold text-xl ">
          Stay Up-to-Date with My Latest Posts
        </h1>
        <p className="text-md font-medium">
          Check out my latest posts to see what I've been up to. Whether it's
          tutorials, demos, or just general updates, you'll find it all here.
        </p>
      </div>
      <p className="text-muted-foreground mb-6 tracking-[0.095em] uppercase font-semibold text-md">
        Showing {posts.length >=  6 ? 6 : posts.length} / {posts.length} Posts
      </p>
      {/* @ts-ignore */}
      <PostsList postz={posts.slice(0,6)}/>
      <div className="pt-24 pb-12 flex justify-center">
        <Link href={"/explore"} className="flex rounded-md  justify-center w-1/2 shadow-xl group bg-gradient-to-r from-emerald-500 to-blue-900">
          <Button
            
            className="dark:text-white flex justify-center bg-transparent hover:bg-transparent space-x-3 items-center"
          >
            <p className=" group-hover:-translate-x-1 transition duration-300 ease-in-out">
              Explore More
            </p>
            <ArrowRight className="group-hover:translate-x-1 transition duration-300 ease-in-out" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
