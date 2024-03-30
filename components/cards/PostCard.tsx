"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tag, User } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface PostCardProps {
  coverImage: string;
  user: User
  title: string;
  createdAt: Date;
  description?: string;
  pathName?: string;
  tags?: Tag[];
}

const PostCard: React.FC<PostCardProps> = ({
  coverImage,
  title,
  user,
  description = "",
  pathName,
  createdAt,
  tags,
}) => {
  const router = useRouter()
  const onUpdateTag = (tag: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("tag", tag);
  
    let newPathname = window.location.pathname;
    if (!newPathname.includes('/explore')) {
      newPathname = '/explore' + newPathname; 
    }
    newPathname += `?${searchParams.toString()}`;
    
    router.push(newPathname);
  };
  return (
    <div className="group shadow-xl relative overflow-hidden bg-neutral-100  rounded-xl p-4 border border-neutral-800 dark:border-neutral-800 dark:bg-neutral-800 ">
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
        <div className="overlay z-[2] absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 ease-in-out rounded-md" ></div>
        <div className="z-[3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Link className="px-3" href={`posts/${pathName}`}>
            <Button className="group flex space-x-2 items-center w-10/12 bg-sky-800">
              <p>Read Now</p>
              <ArrowUpRight className="hover:translate-x-2 transition duration-300 ease-in-out " size={40} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col space-y-3 group-hover:cursor-pointer relative z-[1]">
        <div className="flex items-center">
          <div className="flex flex-col space-y-2 pt-3">
            <h1 className="font-semibold text-lg">{title}</h1>
            <p className="overflow-hidden overflow-ellipsis dark:text-muted-foreground text-zinc-800 text-sm  line-clamp-2">
              {description}
            </p>

            <p className="dark:text-muted-foreground text-zinc-800 text-xs font-light">
              Posted {formatDate(createdAt)} By <span className="underline capitalize">{user.name}</span>
            </p>
          </div>
          <div className="ml-2 mt-12 hidden">
            <Avatar className="border-2 border-white">
              <AvatarImage src="https://images.unsplash.com/photo-1573547429441-d7ef62e04b63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFub255bW91c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60" />
            </Avatar>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {tags?.map((tag, i) => (
            <button key={i} onClick={() => onUpdateTag(tag.name)}>
              <Badge className="py-2 rounded-md bg-[#0c1d36] dark:text-white cursor-pointer">
                #{tag.name}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;