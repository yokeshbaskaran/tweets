import React from "react";
import SinglePost from "./SinglePost";
import { useGetAllPosts } from "../../hooks/useGetUserPosts";

const AllPosts = () => {
  const { data: posts } = useGetAllPosts();

  return (
    <div className="py-5 flex flex-col gap-3">
      {/* Individual Posts  */}

      {posts && posts.map((post) => <SinglePost key={post._id} post={post} />)}
    </div>
  );
};

export default AllPosts;
