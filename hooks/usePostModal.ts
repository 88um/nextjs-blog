import { Post } from "@prisma/client";
import { create } from "zustand";

interface PostModalStore{
    isOpen : boolean;
    onOpen : () => void;
    onClose: () => void;
    post? : Post
    setPost : (post: Post) => void;
}

const usePostModal = create<PostModalStore>((set)=>(
    {
        isOpen: false,
        post: undefined,
        onOpen: ()=> set({isOpen: true}),
        onClose: ()=> set({isOpen: false}),
        setPost: (post : Post) => set({post: post})
    }
))

export default usePostModal;