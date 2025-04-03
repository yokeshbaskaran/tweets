import React from "react";
import SinglePost from "./SinglePost";
import { useGetAllPosts } from "../../hooks/useGetUserPosts";

const AllPosts = () => {
  const { data: posts } = useGetAllPosts();

  return (
    <div className="py-5 flex flex-col gap-3">
      {/* Individual Posts  */}

      {posts ? (
        posts.map((post) => <SinglePost key={post._id} post={post} />)
      ) : (
        <div className="py-5 text-lg text-left text-gray-400">
          Loading posts
        </div>
      )}

      {posts?.length === 0 && (
        <div className="py-10 text-lg text-center text-gray-400">
          No Posts created yet
        </div>
      )}
    </div>
  );
};

export default AllPosts;
