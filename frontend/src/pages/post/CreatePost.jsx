import { RxAvatar } from "react-icons/rx";
import { API_URL, useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { useGetAllPosts } from "../../hooks/useGetUserPosts";
import { Link } from "react-router-dom";
import SinglePost from "./SinglePost";

const CreatePost = () => {
  const [text, setText] = useState("");
  // const [img, setImg] = useState(null);
  const { authUser } = useAppContext();
  const queryClient = useQueryClient();

  const { mutate: createPost, isPending } = useMutation({
    mutationFn: async ({ text }) => {
      try {
        const postData = { text };
        if (text) {
          const res = await axios.post(API_URL + "/posts/create", postData, {
            withCredentials: true,
          });
          const response = res.data;
          console.log(response);
          return response;
        } else {
          alert("Type your message in a post!");
        }
      } catch (error) {
        console.log("Error in createPost", error);
      }
    },
    onSuccess: () => {
      setText("");
      toast.success("Post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    createPost({ text });
  };

  const { data: recentPosts } = useGetAllPosts(authUser?.username);
  // console.log("recentPosts", recentPosts);

  return (
    <section>
      <h2 className="text-2xl font-semibold">Create Post</h2>

      <div className="my-2 px-2 py-4 rounded flex flex-col">
        <div className="flex items-start gap-2">
          <div className="max-md">
            {authUser?.profileImg ? (
              <img
                src={authUser.profileImg}
                className="size-12 object-cover"
                alt="user-profile"
              />
            ) : (
              <RxAvatar className="p-1 size-12" />
            )}
          </div>
          <textarea
            type="text"
            className="w-full h-[100px] p-2 text-lg border border-appColor focus:border-2 focus:border-sky-600 rounded outline-none resize-none placeholder:text-gray-400"
            placeholder="Share your Thoughts here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <button
          onClick={handleCreatePost}
          className="self-end mt-5 my-1 px-7 py-2 text-white bg-appColor rounded hover:opacity-80"
        >
          {isPending ? "Posting" : "Post"}
        </button>
      </div>

      {/* divider  */}
      <div className="relative">
        <div className="absolute inset-0 md:px-2 flex items-center">
          <span className="w-full border-t border-gray-300"></span>
        </div>
      </div>

      {/* Posts Section */}
      <div className="md:px-3 px-1 py-3">
        <h3 className="px-1 text-lg font-semibold">Recent Posts</h3>

        {/* Single Post */}
        <div className="pt-2 grid sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {recentPosts ? (
            recentPosts
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 8)
              .map((post) => (
                <SinglePost
                  key={post._id}
                  post={post}
                  username={authUser?.username}
                />
              ))
          ) : (
            <div className="py-10 text-gray-500">
              <span>Loading Posts...</span>
            </div>
          )}

          {recentPosts?.length === 0 && (
            <div className="pt-10 pb-5 flex flex-col justify-center items-center text-gray-500 text-center">
              <span>No Posts created</span>

              <Link
                to="/create"
                className="my-3 px-3 py-3 border text-appColor hover:text-white hover:bg-appColor rounded"
              >
                Click here to create!
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
