import { RxAvatar } from "react-icons/rx";
import Suggested from "../../components/Suggested";
import { useAppContext } from "../../context/AppContext";
import { Link, Links } from "react-router-dom";
import { formatSinceDate } from "../../utils/formatDate";
import { useGetUserPosts } from "../../hooks/useGetUserPosts";
import SinglePost from "../post/SinglePost";
import MyProfile from "../../components/skeleton/MyProfile";
import Post from "../../components/skeleton/Post";

const Profile = () => {
  const { authUser, isLoading } = useAppContext();
  // console.log(authUser);

  const handleEditProfile = () => {
    console.log("edit profile");
  };

  const sinceFromDate = formatSinceDate(authUser?.createdAt);
  // console.log("sinceFromDate", sinceFromDate);

  const { data: myPosts, isLoading: postIsLoading } = useGetUserPosts(
    authUser?.username
  );
  // console.log("myPosts", myPosts);

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          {authUser && (
            <div className="w-full bg-white overflow-hidden">
              {/* Cover Image */}

              {/* Cover Image */}
              {authUser?.coverImg ? (
                <img
                  src={authUser.coverImg}
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
                    {authUser?.profileImg ? (
                      <img
                        src={authUser.profileImg}
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
                  {authUser?.username}
                </h2>
                <p className="text-gray-400 font-semibold">
                  @{authUser?.username}
                </p>
                {authUser?.bio && (
                  <p className="py-1 text-sm text-gray-500">
                    Bio: {authUser?.bio}
                  </p>
                )}
                <div className="py-1 text-sm text-gray-400 text-center">
                  <span>{sinceFromDate}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-center mt-5 mb-8 text-center gap-5">
                <div>
                  <h3 className="text-lg font-semibold">
                    {postIsLoading ? "0" : myPosts?.length}
                  </h3>
                  <p className="text-gray-500 text-sm">Posts</p>
                </div>

                <Link to="/followers">
                  <h3 className="text-lg font-semibold">
                    {authUser?.followers?.length
                      ? authUser?.followers?.length
                      : 0}
                  </h3>
                  <p className="text-gray-500 text-sm">Followers</p>
                </Link>

                <Link to="/following">
                  <h3 className="text-lg font-semibold">
                    {authUser?.following?.length
                      ? authUser?.following?.length
                      : 0}
                  </h3>
                  <p className="text-gray-500 text-sm">Following</p>
                </Link>
              </div>

              {/* Edit Profile Button */}
              <div className="text-center mb-8">
                <Link
                  to="/profile/edit"
                  onClick={handleEditProfile}
                  className="px-4 py-2 rounded-md bg-appColor text-white hover:opacity-80"
                >
                  Edit Profile
                </Link>
              </div>

              {/* divider  */}
              <div className="relative">
                <div className="absolute inset-0 md:px-2 flex items-center">
                  <span className="w-full border-t border-gray-300"></span>
                </div>
              </div>

              {/* Posts Section */}
              <div className="md:px-3 py-3">
                <h3 className="px-1 text-lg font-semibold">Your Posts</h3>

                {/* Single Post */}
                <div className="mt-3">
                  {myPosts ? (
                    myPosts.map((post) => (
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

                  {myPosts?.length === 0 && (
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
            </div>
          )}

          {/* Only display the UserProfile Skeleton when loading  */}
          {isLoading && <MyProfile />}
        </div>
      </div>
    </>
  );
};

export default Profile;
