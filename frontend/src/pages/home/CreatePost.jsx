import { RxAvatar } from "react-icons/rx";
import { useAppContext } from "../../context/AppContext";

const CreatePost = () => {
  const { authUser } = useAppContext();
  return (
    <div className="my-2 px-2 md:px-4 py-4 bg-gray-100 rounded flex flex-col">
      <div className="flex items-start gap-2">
        <div className="max-md:hidden">
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
        />
      </div>

      <button className="self-end mt-5 my-1 px-7 py-2 text-white bg-appColor rounded hover:opacity-80">
        Post
      </button>
    </div>
  );
};

export default CreatePost;
