"use client";

import usePostModal from "@/hooks/usePostModal";
import PostForm from "../forms/PostForm";
import { Modal } from "../ui/modal";


interface PostModalProps {}

const EditPostModal: React.FC<PostModalProps> = ({}) => {
  const { isOpen, post, onClose, setPost } = usePostModal();
  return (
    <Modal
      title="Add/Edit Post"
      description="Add your post below"
      isOpen={isOpen}
      onClose={onClose}
      className="text-start"
    >
      <PostForm initialValues={post}/>
    </Modal>
  );
};

export default EditPostModal;
