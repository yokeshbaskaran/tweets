import React from "react";
import { POSTS } from "../../db/dummy.js";
import { BsDot } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { IoShareSocialOutline } from "react-icons/io5";
import { useAppContext } from "../../context/AppContext.jsx";
import { RxAvatar } from "react-icons/rx";

const AllPosts = () => {
  const { authUser } = useAppContext();
  return (
    <div className="py-5 flex flex-col gap-3">
      {/* Individual Posts  */}

      {POSTS.map((post) => (
        <div
          className="px-2 py-2 md:px-5 md:py-5 bg-bgBlue rounded"
          key={post._id}
        >
          <div className="flex gap-3 items-start">
            <div>
              {/* User profile img  */}
              {authUser?.profileImg ? (
                <img
                  src={authUser.profileImg}
                  className="w-12 h-12 object-cover"
                  alt="user-profile"
                />
              ) : (
                <RxAvatar className="p-1 size-12" />
              )}
            </div>

            {/*  user details */}
            <div>
              <div className="py-1 flex items-center gap-1">
                <span className="text-xl font-medium">@user_id</span>
                <BsDot size={20} />
                <span className="text-gray-500">1y</span>
              </div>

              <div className="py-2">
                <p>{post.text}</p>
              </div>

              <div className="pt-2 flex items-center gap-5">
                <div className="flex items-center gap-1">
                  <GoHeart size={18} />
                  <span>1</span>
                </div>

                {/* <div className="flex items-center gap-1">
                  <GoHeart size={18} />
                  <span>1</span>
                </div> */}

                <div className="flex items-center gap-1">
                  <IoShareSocialOutline size={18} />
                  <span>1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
