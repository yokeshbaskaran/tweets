import { RxAvatar } from "react-icons/rx";
import { API_URL, useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [text, setText] = useState("");
  // const [img, setImg] = useState(null);
  const { authUser } = useAppContext();

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
    },
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    createPost({ text });
  };

  return (
    <section className="">
      <h2 className="text-2xl font-semibold">Create Post</h2>

      <div className="my-2 px-2 py-4 bg-gray-50 rounded flex flex-col">
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
    </section>
  );
};

export default CreatePost;
