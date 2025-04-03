import React from "react";
import SinglePost from "./SinglePost";
import { useGetAllPosts } from "../../hooks/useGetUserPosts";
import Post from "../../components/skeleton/Post";

const AllPosts = () => {
  const { data: posts, isLoading } = useGetAllPosts();

  return (
    <div className="py-5 flex flex-col gap-3">
      {/* Individual Posts  */}

      {posts?.map((post) => (
        <SinglePost key={post._id} post={post} />
      ))}

      {isLoading && (
        <>
          {[...Array(5)].map((_, i) => (
            <Post key={i} />
          ))}
        </>
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
