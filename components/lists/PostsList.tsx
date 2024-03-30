'use client';

import { Post, posts } from "@/dummy";
import PostCard from "../cards/PostCard";


interface PostsListProps {
    query?: string;
    postz : Post[];
}

const PostsList: React.FC<PostsListProps> = ({postz}) => {
  return (
    <div className="">
      {postz.length ===0 ? (
        <div className="text-muted-foreground">
          No posts found.
        </div>
      ) : (
        <div className="grid gap-x-6 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {postz.map
            ((post, index)=>(
              //@ts-ignore
                <PostCard key={index} {...post}/>
            )) }
        </div>
      )}
        
    </div>
  );
};

export default PostsList;