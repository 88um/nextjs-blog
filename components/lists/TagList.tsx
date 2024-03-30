"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {PiSlidersLight} from 'react-icons/pi'
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface TagListProps {
  tags: string[];
  selectedTag?: string;
}

const TagList: React.FC<TagListProps> = ({ tags, selectedTag }) => {
  //const pathname = usePathname();
  const router = useRouter()
  const onUpdateTag = (tag : string) =>{
    const searchParams = new URLSearchParams(window.location.search);
    if (tag) {
      searchParams.set('tag', tag);
    } else {
      searchParams.delete('tag');
    }
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newPathname);
  };
  return (
    <div className="flex flex-col space-y-8 mb-5">
        <div className="flex space-x-2 items-center">
            <PiSlidersLight size={25}/>
            <h1 className="font-bold text-xl">
            Filter Posts By Tag
        </h1>
        </div>
        
      <div className="flex flex-wrap items-center gap-2 md:max-w-2xl lg:max-w-3xl">
        <div>
          <button onClick={() => onUpdateTag("")}>
            <Badge
             className={!selectedTag  ? "px-3 py-1 bg-black text-white dark:bg-white  dark:text-black" : "px-3 py-1 text-black bg-gray-200 dark:bg-white/10 dark:text-white hover:bg-gray-300 dark:hover:bg-white/20"}
            >
              All
            </Badge>
          </button>
        </div>
        {tags.map((tag, i) => (
          <button key={i} onClick={() => onUpdateTag(tag)} >
            <Badge
              
              className={selectedTag === tag ? "px-3 py-1 bg-black text-white dark:bg-white  dark:text-black" : "px-3 py-1 text-black bg-gray-200 dark:bg-white/10 dark:text-white hover:bg-gray-300 dark:hover:bg-white/20"}
            >
              #{tag}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagList;
