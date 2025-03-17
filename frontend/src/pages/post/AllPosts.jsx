import React from "react";
import { POSTS } from "../../db/dummy.js";

const AllPosts = () => {
  return (
    <div className="px-2 py-5">
      {POSTS.map((post) => (
        <div key={post._id}>
          <p>{post.text}</p>
          {post?.img && <img src={post.img} alt="img" />}{" "}
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
