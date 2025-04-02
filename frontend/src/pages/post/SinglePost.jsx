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
import { Link, useNavigate } from "react-router-dom";

const SinglePost = ({ post, username }) => {
  const { _id, text, img, likes, comments, user } = post;
  // console.log("post", post);

  const usernameFromParent = username || "";
  const { authUser } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isLiked = likes?.includes(authUser?._id);

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
        // console.log("data", data);
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

      // Update profile page posts
      queryClient.setQueryData(["userAllPosts", usernameFromParent], (old) => {
        return old?.map((post) =>
          post._id === _id ? { ...post, likes: updatedLikes } : post
        );
      });
    },
  });

  const handleLikePost = (e) => {
    e.preventDefault();
    if (isLiking) return;
    likePost();
  };

  const handleCopy = (text) => {
    const copyLink = `/post/${text}`;
    navigator.clipboard.writeText(copyLink);
    toast.success("Link Copied!");
  };

  const handlePostNavigation = (e) => {
    e.preventDefault();
    const target = authUser ? `/post/${_id}` : "/login";
    navigate(target);
  };

  const handleUserNavigation = (e) => {
    e.preventDefault();
    const isMyProfile = authUser?.username === user?.username;
    const target = authUser
      ? isMyProfile
        ? `/myprofile`
        : `/user/profile/${user?.username}`
      : "/login";
    navigate(target);
  };

  return (
    <>
      <div className="my-3 md:px-3 md:py-3 bg-bgBlue rounded">
        <div className="px-1 py-2 flex gap-x-2 items-start">
          {/* Profile Image Container */}
          <div
            onClick={handleUserNavigation}
            className="size-14 -mt-1 object-cover rounded-full cursor-pointer"
          >
            {user?.profileImg ? (
              <img
                src={user?.profileImg}
                alt="user-pic"
                className="size-full object-contain"
              />
            ) : (
              <RxAvatar className="size-full px-2" />
            )}
          </div>

          {/* User Details */}
          <div className="w-full">
            <div className="py-1 flex items-center gap-1 text-gray-500">
              <h2 className="pr-2 text-xl text-black font-semibold capitalize">
                {user?.username}
              </h2>
              <div
                onClick={handleUserNavigation}
                className="font-medium cursor-pointer"
              >
                @{user?.username}
              </div>
              <BsDot size={20} />
              <span>1y</span>
            </div>

            <div className="cursor-pointer" onClick={handlePostNavigation}>
              <p className="px-1 py-2">{text}</p>
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
                <span>{likes?.length}</span>
              </button>

              <div className="flex items-center gap-1 cursor-pointer">
                <FaRegComment size={18} />
                <span>{comments?.length}</span>
              </div>

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
