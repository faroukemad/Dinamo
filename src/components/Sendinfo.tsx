import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "./postsContext.tsx";
import { useSendInfo } from "./useSendInfo.tsx";

const Sendinfo: React.FC = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error("PostsContext must be used within PostsProvider");

  const { posts, setPosts } = context;
  const navigate = useNavigate();
  const { formData, loading, handleChange, handleSubmit } = useSendInfo(posts, setPosts, navigate);

  return (
    <Form
      className='sendinfo-form'
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Title"
        rules={[{ required: true, message: "Please enter a title!" }]}
      >
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
        />
      </Form.Item>
      <Form.Item
        label="Body"
        rules={[{ required: true, message: "Please enter the body content!" }]}
      >
        <Input.TextArea
          name="body"
          value={formData.body}
          onChange={handleChange}
          placeholder="Enter body"
          rows={4}
          className="sendinfo-textarea"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Sendinfo;
