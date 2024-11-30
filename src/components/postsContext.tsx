import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsContextType {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
}

export const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};
