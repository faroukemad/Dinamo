import { useState } from "react";
import { message } from "antd";
import axios from "axios";

export const useSendInfo = (posts, setPosts, navigate) => {
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { title, body } = formData;

    if (!title || !body) {
      message.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const { data: newPost } = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title,
        body,
      });
      setPosts([...posts, newPost]);
      message.success("Post submitted successfully!");
      setFormData({ title: "", body: "" });
      navigate("/");
    } catch (error) {
      message.error("Failed to submit post.");
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, handleChange, handleSubmit };
};
