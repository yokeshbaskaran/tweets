import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { useAppContext } from "../../context/AppContext";
import { useGetUserFollow } from "../../hooks/useGetUserProfile";
import { IoArrowBackOutline } from "react-icons/io5";
import useFollow from "../../hooks/useFollow";
import toast from "react-hot-toast";
import { RiUserUnfollowLine } from "react-icons/ri";

const Following = () => {
  const { authUser } = useAppContext();
  const navigate = useNavigate();

  // console.log("authUser", authUser);
  const { data } = useGetUserFollow();
  // console.log("users", data.following);

  const following = data?.following;
  // console.log(following);

  return (
    <div>
      <button
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IoArrowBackOutline size={24} className="text-gray-500" />
        <h2 className="px-2 py-3 text-2xl font-semibold">following </h2>
      </button>

      {authUser?.following.length ? (
        <section className="py-5 flex flex-col gap-3">
          {/* User profile  */}

          {following?.map((following) => (
            <Singlefollowing key={following._id} following={following} />
          ))}
        </section>
      ) : (
        <div className="py-10 text-gray-500 text-center">
          <span>No following yet!</span>
        </div>
      )}
    </div>
  );
};

export default Following;

export const Singlefollowing = ({ following }) => {
  // console.log("following", following);

  const { follow } = useFollow();

  const handleRemoveUser = () => {
    follow(following?._id);

    toast(`Unfollowed ${following?.username}`, {
      icon: <RiUserUnfollowLine color="red" />,
    });
  };

  return (
    <>
      <div className="py-1 flex items-center justify-between">
        <div className="px-2 flex items-center gap-1">
          <Link
            to={`/user/profile/${following?.username}`}
            className="size-14 -mt-1 object-cover rounded-full"
          >
            {/* Profile Image Container */}
            {following?.profileImg ? (
              <img
                src={following?.profileImg}
                alt="user-pic"
                className="size-full object-contain"
              />
            ) : (
              <RxAvatar color="#1d9bf0" className="size-full px-2" />
            )}
          </Link>

          <Link
            to={`/user/profile/${following?.username}`}
            className="flex flex-col"
          >
            <span className="text-xl font-semibold capitalize">
              {following?.username}
            </span>
            <span className="text-gray-500">@{following?.username}</span>
          </Link>
        </div>

        <div className="px-2">
          <button
            onClick={handleRemoveUser}
            className="px-5 py-2 flex justify-center items-center gap-3 rounded bg-appColor text-white cursor-pointer"
          >
            <span className="text-lg font-semibold capitalize">unfollow</span>
          </button>
        </div>
      </div>
    </>
  );
};
