import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

export const usePosts = (initialPosts: any[], setPosts: React.Dispatch<React.SetStateAction<any[]>>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState({ id: 0, title: "", body: "" });

  useEffect(() => {
    if (initialPosts.length === 0) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => setPosts(response.data))
        .catch((error) => {
          message.error("Failed to fetch posts from the API. Please try again later.");
        });
    }
  }, [initialPosts, setPosts]);

  const handleEdit = (post: { id: number; title: string; body: string }) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        message.success("Post deleted successfully.");
      })
      .catch((error) => {
        message.error("Failed to delete post. Please try again later.");
      });
  };

  const handleModalOk = () => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${currentPost.id}`, currentPost)
      .then(() => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === currentPost.id ? { ...post, title: currentPost.title, body: currentPost.body } : post
          )
        );
        message.success("Post updated successfully.");
        setIsModalOpen(false);
      })
      .catch((error) => {
        message.error("Failed to update post. Please try again later.");
      });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setCurrentPost({ ...currentPost, [field]: value });
  };

  return {
    isModalOpen,
    currentPost,
    setIsModalOpen,
    handleEdit,
    handleDelete,
    handleModalOk,
    handleModalCancel,
    handleInputChange,
  };
};
