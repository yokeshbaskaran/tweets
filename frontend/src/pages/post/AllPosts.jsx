import React from "react";
import SinglePost from "./SinglePost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../context/AppContext";

const AllPosts = () => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      // all-posts
      try {
        const res = await axios.get(API_URL + "/posts/all", {
          withCredentials: true,
        });
        const data = res.data;
        return data;
      } catch (error) {
        console.log("get posts", error);
      }
    },
  });

  return (
    <div className="py-5 flex flex-col gap-3">
      {/* Individual Posts  */}

      {posts && posts.map((post) => <SinglePost key={post._id} post={post} />)}
    </div>
  );
};

export default AllPosts;
