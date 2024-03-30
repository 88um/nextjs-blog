
import Pager from "@/components/utils/Pager";
import PostsList from "@/components/lists/PostsList";
import TagList from "@/components/lists/TagList";
import { fetchAllTags } from "@/actions/fetch-tags";
import { getAllPosts } from "@/actions/fetch-posts";
import Link from "next/link";
import { Search } from "lucide-react";
import SearchBar from "@/components/utils/SearchBar";


interface page {
  searchParams: {
    page: string;
    limit: string;
    tag: string;
    search: string;
  };
}

const ExplorePage = async ({ searchParams }: page) => {
  const tags = await fetchAllTags();
  const postz = await getAllPosts(searchParams.tag, searchParams.search ?? "");
  const page = searchParams.page ?? "1";
  const limit = searchParams.limit ?? "6";
  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit);
  const totalPages = Math.ceil(postz.length / Number(limit));
  const posts = postz.slice(start, end);
  if (postz.length == 0){
    return (

      <div className="flex flex-col items-center justify-center h-screen">
   
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops, No Results Were Found </h1>
        <Link href="/explore">
          <p className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go back to explore
          </p>
        </Link>
      </div>
    )
  }

  if (Number(page) > totalPages) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
      
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops, No Such Post Found </h1>
      <Link href="/explore">
        <p className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Go back to explore
        </p>
      </Link>
    </div>
    )
  }
  return (
    <div className="container mx-auto lg:px-20 p-6">
      <div className="flex flex-col space-y-4">
        <TagList tags={tags} selectedTag={searchParams.tag}/>
        <SearchBar/>
        <p className="text-muted-foreground pt-7 mb-3 tracking-[0.095em] uppercase font-semibold text-xs">
          {postz.length} Total Posts
        </p>
        {/* @ts-ignore */}
        <PostsList postz={posts}/>
        <Pager hasNext={end < postz.length} totalPages={totalPages} page={Number(page)} limit={Number(limit)} />
      </div>
    </div>

  );
};

export default ExplorePage;
