import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL, useAppContext } from "../../context/AppContext";
import { formatPostDate } from "../../utils/formatDate";
import { RxAvatar } from "react-icons/rx";
import { BsDot } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { IoShareSocialOutline, IoTrashOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Post from "../../components/skeleton/Post";

const PostPage = () => {
  const { id } = useParams();
  const postId = id;
  // console.log("post id", postId);

  const { authUser } = useAppContext();
  const navigate = useNavigate();

  const { data: singlePost, isLoading } = useQuery({
    queryKey: ["userSinglePost"],
    queryFn: async () => {
      try {
        const res = await axios.get(API_URL + `/posts/${postId}`, {
          withCredentials: true,
        });
        const data = res.data;
        return data;
      } catch (error) {
        console.log("like-post", error);
      }
    },
  });

  const handleCopy = (text) => {
    const splitText = API_URL.split("/").splice(0, 3).join("/");
    // console.log("split-text:", splitText);

    const copyLink = splitText + `/post/${text}`;
    console.log("copy", copyLink);
    navigator.clipboard.writeText(copyLink);
    toast.success("Link Copied!");
  };

  const isLiked = singlePost?.likes?.includes(authUser?._id);
  const formatDate = formatPostDate(singlePost?.createdAt);
  // console.log("formatDate", formatDate);

  const isMyProfile = authUser?.username === singlePost?.user?.username;
  // console.log("singlePost", singlePost);

  return (
    <>
      <div className="md:w-3/4">
        <button
          className="py-2 flex items-center gap-1 cursor-pointer text-gray-600"
          onClick={() => navigate(-1)}
        >
          <IoArrowBackOutline size={19} />
          <span className="text-lg ">Back</span>
        </button>

        {/* Post is here  */}
        {!isLoading && (
          <div className="my-1 md:px-3 md:py-3">
            <div className="w-full px-2 flex flex-col">
              {/* Profile Image Container */}

              <div className="flex gap-2">
                <Link
                  to={`${
                    isMyProfile
                      ? `/myprofile`
                      : `/user/profile/${singlePost?.user?.username}`
                  }`}
                  className="size-16 -mt-1 object-cover rounded-full cursor-pointer"
                >
                  {singlePost?.user?.profileImg ? (
                    <img
                      src={singlePost?.user?.profileImg}
                      alt="user-pic"
                      className="size-full object-contain"
                    />
                  ) : (
                    <RxAvatar color="#1d9bf0" className="size-full px-2" />
                  )}
                </Link>

                {/* User Details */}
                <div className="w-full">
                  <div className="py-1 flex flex-col items-start gap-1 text-gray-500">
                    <h2 className="pr-2 text-xl text-black font-bold capitalize">
                      {singlePost?.user?.username}
                    </h2>

                    <div className="flex items-center gap-1">
                      <Link
                        to={`${
                          isMyProfile
                            ? `/myprofile`
                            : `/user/profile/${singlePost?.user?.username}`
                        }`}
                        className="font-medium cursor-pointer"
                      >
                        @{singlePost?.user?.username}
                      </Link>
                      <BsDot size={20} />
                      <span className="text-sm">{formatDate}</span>
                    </div>
                  </div>

                  {/* <div className="cursor-pointer" onClick={handlePostNavigation}> */}
                </div>
              </div>

              {/* post text */}
              <div>
                <p className="w-full px-1 py-2 text-lg text-justify inter-font">
                  {singlePost?.text}
                </p>
              </div>

              {/* Icons Row */}
              <div className="pt-2 flex items-center gap-5 text-gray-500  ">
                <button
                  // onClick={handleLikePost}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  {!isLiked && (
                    <GoHeart size={20} className="hover:text-red-500" />
                  )}
                  {isLiked && <GoHeartFill color="#fb2c36" size={20} />}
                  <span>{singlePost?.likes?.length}</span>
                </button>

                {/* <div className="flex items-center gap-1 cursor-pointer">
                  <FaRegComment size={18} />
                  <span>{singlePost?.comments?.length}</span>
                </div> */}

                <button
                  className="p-2 cursor-pointer hover:rounded-full hover:bg-gray-200"
                  onClick={() => handleCopy(singlePost?._id)}
                >
                  <IoShareSocialOutline size={18} />
                </button>
              </div>
            </div>

            {/* Divider  */}
            <div className="mx-1 py-3 border-b border-gray-300"></div>

            <div className="pt-1">
              <h3 className="py-2 font-normal text-gray-400">
                Comment your reply
              </h3>
              <textarea
                name="bio"
                // placeholder="Bio"
                className="h-24 p-2 w-full border-2 border-gray-300 rounded focus:outline-appColor"
                rows="3"
                // value={formData.bio}
                // onChange={handleChange}
                disabled
              ></textarea>

              <button className="my-2 px-5 py-2 text-white bg-appColor hover:opacity-85 rounded capitalize">
                reply
              </button>
            </div>

            {/* Divider  */}
            {singlePost?.comments.length > 0 && (
              <div>
                <div className="mx-1 py-3 border-b border-gray-300"></div>

                <div className="my-5 text-lg font-semibold">
                  <h2 className="mb-3">Comments</h2>

                  {/* Single Comments  */}
                  <div></div>
                </div>
              </div>
            )}
          </div>
        )}

        {isLoading && (
          <div className="py-5 text-gray-400">
            <Post />
          </div>
        )}
      </div>
    </>
  );
};

export default PostPage;
