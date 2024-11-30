import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Posts from "./components/Posts.tsx";
import Sendinfo from "./components/Sendinfo.tsx";
import { PostsProvider } from "./components/postsContext.tsx";
import Header from "./components/Header.tsx";

const App: React.FC = () => {
  return (
    <PostsProvider>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/sendInfo" element={<Sendinfo />} />
      </Routes>
    </BrowserRouter>
    </PostsProvider>
  );
};

export default App;
