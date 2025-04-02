import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { useAppContext } from "../../context/AppContext";
import { useGetUserFollow } from "../../hooks/useGetUserProfile";
import { IoArrowBackOutline } from "react-icons/io5";

const Followers = () => {
  const { authUser } = useAppContext();
  const navigate = useNavigate();

  // console.log("authUser", authUser);
  const { data } = useGetUserFollow();
  // console.log("users", data.followers);

  const followers = data?.followers;
  console.log(followers);

  return (
    <div>
      <button
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IoArrowBackOutline size={24} className="text-gray-500" />
        <h2 className="px-2 py-3 text-2xl font-semibold">Followers </h2>
      </button>

      {authUser?.followers.length ? (
        <section className="py-5 flex flex-col gap-3">
          {/* User profile  */}

          {followers?.map((follower) => (
            <SingleFollower key={follower._id} follower={follower} />
          ))}
        </section>
      ) : (
        <div className="py-10 text-gray-500 text-center">
          <span>No followers yet!</span>
        </div>
      )}
    </div>
  );
};

export default Followers;

export const SingleFollower = ({ follower }) => {
  console.log("follower", follower);

  const handleRemoveUser = () => {
    alert("Follower Removed");
  };

  return (
    <>
      <div className="py-1 flex items-center justify-between">
        <div className="px-2 flex items-center gap-1">
          <Link
            to={`/user/profile/${follower?.username}`}
            className="size-14 -mt-1 object-cover rounded-full"
          >
            {/* Profile Image Container */}
            {follower?.profileImg ? (
              <img
                src={follower?.profileImg}
                alt="user-pic"
                className="size-full object-contain"
              />
            ) : (
              <RxAvatar color="#1d9bf0" className="size-full px-2" />
            )}
          </Link>

          <Link
            to={`/user/profile/${follower?.username}`}
            className="flex flex-col"
          >
            <span className="text-xl font-semibold capitalize">
              {follower?.username}
            </span>
            <span className="text-gray-500">@{follower?.username}</span>
          </Link>
        </div>

        <div className="px-2">
          <button
            onClick={handleRemoveUser}
            className="px-5 py-2 flex justify-center items-center gap-3 rounded bg-appColor text-white cursor-pointer"
          >
            <span className="text-lg font-semibold capitalize">remove</span>
          </button>
        </div>
      </div>
    </>
  );
};
