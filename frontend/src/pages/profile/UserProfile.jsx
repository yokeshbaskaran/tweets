import { RxAvatar } from "react-icons/rx";
import Suggested from "../../components/Suggested";
import { useAppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { useGetUserPosts } from "../../hooks/useGetUserPosts";
import { formatSinceDate } from "../../utils/formatDate";
import SinglePost from "../post/SinglePost";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import useFollow from "../../hooks/useFollow";
import toast from "react-hot-toast";
import { FaRegUser } from "react-icons/fa";
import MyProfile from "../../components/skeleton/MyProfile";
import Post from "../../components/skeleton/Post";

const Profile = () => {
  const { authUser } = useAppContext();

  const { username } = useParams();
  // console.log("useParams", username);

  const { data: user, isLoading } = useGetUserProfile(username);
  const { data: userPosts, isLoading: postIsLoading } =
    useGetUserPosts(username);
  const { follow } = useFollow();

  const isFollowed = authUser?.following.includes(user?._id);
  // console.log("isFollowed", isFollowed);

  const handleFollow = () => {
    isFollowed
      ? toast(`you unfollowed ${user?.username}`, {
          icon: <FaRegUser color="red" />,
        })
      : toast(`you followed ${user?.username}`, {
          icon: <FaRegUser color="green" />,
        });
    // console.log("user-id:", authUser._id, user._id);
    follow(user._id);
  };

  //console.log("profile", user);
  // console.log("userPosts", userPosts);
  // console.log("authUser", authUser);

  const sinceFromDate = formatSinceDate(user?.createdAt);
  // console.log("sinceFromDate", sinceFromDate);

  return (
    <>
      <div>
        {!isLoading && (
          <div className="w-full flex-1 bg-white overflow-hidden">
            {/* Cover Image */}
            {user?.coverImg ? (
              <img
                src={user.coverImg}
                alt="user-profile"
                className="w-full h-32 rounded-lg object-cover"
              />
            ) : (
              <>
                <div className="h-32 rounded-lg bg-gradient-to-r from-cyan-200 via-sky-300 to-appColor"></div>
                {/* <RxAvatar size={40} color="#1d9bf0" /> */}
              </>
            )}

            {/* Profile Picture */}
            <div className="flex justify-center -mt-12">
              <div className="size-20 bg-white rounded-full flex items-center justify-center shadow-md  outline-white outline-4">
                <span className="text-lg font-semibold text-gray-800">
                  {user?.profileImg ? (
                    <img
                      src={user.profileImg}
                      className="size-28 object-cover"
                      alt="user-profile"
                    />
                  ) : (
                    <RxAvatar size={75} />
                  )}
                </span>
              </div>
            </div>

            {/* Profile Details */}
            <div className="text-center mt-5">
              <h2 className="text-3xl font-semibold capitalize">
                {user?.username}
              </h2>
              <p className="text-gray-400 font-semibold">@{user?.username}</p>
              <p className="text-gray-500">{user?.bio}</p>
              <div className="py-1 text-sm text-gray-400 text-center">
                <span>{sinceFromDate}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center my-5 text-center gap-5">
              <div>
                <h3 className="text-lg font-semibold">
                  {postIsLoading ? "0" : userPosts?.length}
                </h3>
                <p className="text-gray-500 text-sm">Posts</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  {user?.followers?.length ? user?.followers?.length : 0}
                </h3>
                <p className="text-gray-500 text-sm">Followers</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  {user?.following?.length ? user?.following?.length : 0}
                </h3>
                <p className="text-gray-500 text-sm">Following</p>
              </div>
            </div>

            {/* Follow Button */}
            <div className="text-center mb-8">
              <button
                onClick={handleFollow}
                className="px-4 py-2 rounded-md bg-appColor text-white hover:opacity-80"
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </button>
            </div>

            {/* User created Posts  */}
            <div>
              <div className="relative">
                {/* divider  */}
                <div className="absolute inset-0 px-2 flex items-center">
                  <span className="w-full border-t border-gray-300"></span>
                </div>
              </div>

              {/* Posts Section */}
              <div className="px-2 py-3">
                <h3 className="text-lg font-semibold capitalize">
                  {user?.username}'s Posts
                </h3>

                {/* Single Post */}
                <div className="mt-3">
                  {userPosts ? (
                    userPosts.map((post) => (
                      <SinglePost key={post._id} post={post} />
                    ))
                  ) : (
                    <>
                      {/* Single Post skeleton */}
                      <div className="my-3">
                        {[...Array(2)].map((_, i) => (
                          <Post key={i} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Only display the UserProfile Skeleton when loading  */}
        {isLoading && <MyProfile />}
      </div>
    </>
  );
};

export default Profile;
