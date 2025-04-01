import React from "react";
import toast from "react-hot-toast";
import { RxAvatar } from "react-icons/rx";
import { BsDot } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL, useAppContext } from "../../context/AppContext";

const SinglePost = ({ post }) => {
  const { _id, text, img, likes, comments, user } = post;
  //   console.log("post", post);

  const { authUser } = useAppContext();
  const queryClient = useQueryClient();

  const isLiked = likes.includes(authUser._id);

  const { mutate: likePost, isPending: isLiking } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.post(
          API_URL + `/posts/like/${_id}`,
          {},
          {
            withCredentials: true,
          }
        );
        const data = res.data;
        console.log("data", data);
        return data;
      } catch (error) {
        console.log("like-post", error);
      }
    },

    onSuccess: (updatedLikes) => {
      //update the cache
      queryClient.setQueryData(["posts"], (old) => {
        return old.map((post) => {
          if (post._id === _id) {
            return { ...post, likes: updatedLikes };
          }
          return post;
        });
      });
    },
  });

  const handleLikePost = () => {
    if (isLiking) return;
    likePost();
  };

  const handleCopy = (text) => {
    const copyLink = `/post/${text}`;
    navigator.clipboard.writeText(copyLink);
    toast.success("Link Copied!");
  };

  return (
    <>
      <div className="md:px-3 md:py-4 bg-bgBlue rounded">
        <div className="px-2 py-2 flex gap-x-3 items-start">
          {/* Profile Image Container */}
          <div className="w-14 h-14 flex items-center justify-center">
            {img ? (
              <img
                src={img}
                className="w-14 h-14 object-cover rounded-full"
                alt="user-profile"
              />
            ) : (
              <RxAvatar className="w-14 h-14 p-2" />
            )}
          </div>

          {/* User Details */}
          <div>
            <div className="py-1 flex items-center gap-2 text-gray-500">
              <h2 className="text-lg text-black font-semibold">
                {user?.fullName}
              </h2>
              <span className="font-medium">@user_id</span>
              <BsDot size={20} />
              <span>1y</span>
            </div>

            <div className="py-2">
              <p>{text}</p>
            </div>

            {/* Icons Row */}
            <div className="pt-2 flex items-center gap-5 text-gray-500  ">
              <button
                onClick={handleLikePost}
                className="flex items-center gap-1 cursor-pointer"
              >
                {!isLiked && !isLiking && (
                  <GoHeart size={20} className="hover:text-red-500" />
                )}
                {isLiked && !isLiking && (
                  <GoHeartFill color="#fb2c36" size={20} />
                )}
                <span>{likes.length}</span>
              </button>
              {/* 
              <div className="flex items-center gap-1 cursor-pointer">
                <FaRegComment size={18} />
                <span>{comments.length}</span>
              </div> */}

              <button
                className="p-2 cursor-pointer hover:rounded-full hover:bg-gray-200"
                onClick={() => handleCopy(_id)}
              >
                <IoShareSocialOutline size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
