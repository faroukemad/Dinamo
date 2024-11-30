import React, { useContext } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { PostsContext } from "./postsContext.tsx";
import { usePosts } from "./usePosts.tsx";

const Posts: React.FC = () => {
  const context = useContext(PostsContext);
  const { posts, setPosts } = context;

  const {
    isModalOpen,
    currentPost,
    handleEdit,
    handleDelete,
    handleModalOk,
    handleModalCancel,
    handleInputChange,
  } = usePosts(posts, setPosts);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: { id: number; title: string; body: string }) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    < div className='posts-form'>
      <Table columns={columns} dataSource={posts} rowKey="id" />
      <Modal
        title="Edit Post"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form layout="vertical" >
          <Form.Item label="Title">
            <Input
              value={currentPost.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Body">
            <Input.TextArea
              value={currentPost.body}
              onChange={(e) => handleInputChange("body", e.target.value)}
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Posts;
