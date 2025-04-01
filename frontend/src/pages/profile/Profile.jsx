import { RxAvatar } from "react-icons/rx";
import Suggested from "../../components/Suggested";
import { useAppContext } from "../../context/AppContext";
import { GoHeart } from "react-icons/go";
import { BsDot } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Profile = () => {
  const { authUser } = useAppContext();
  console.log(authUser);

  const handleEditProfile = () => {
    console.log("edit profile");
  };

  return (
    <>
      <div className="flex">
        <div className="flex-1">
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
              <h2 className="text-xl font-semibold">{authUser?.username}</h2>
              <p className="text-gray-500">{authUser?.bio}</p>
            </div>

            {/* Stats */}
            <div className="flex justify-center my-5 text-center gap-5">
              <div>
                <h3 className="text-lg font-semibold">0</h3>
                <p className="text-gray-500 text-sm">Posts</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {authUser?.following?.length}
                </h3>
                <p className="text-gray-500 text-sm">Following</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {authUser?.followers.length}
                </h3>
                <p className="text-gray-500 text-sm">Followers</p>
              </div>
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
              <div className="absolute inset-0 px-2 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
            </div>

            {/* Posts Section */}
            <div className="px-2 py-3">
              <h3 className="text-lg font-semibold">Your Posts</h3>

              {/* Single Post */}

              <div className="my-3 px-1 py-2 md:px-5 md:py-5 bg-bgBlue rounded">
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

                  {/*  user profile details */}
                  <div>
                    <div className="py-1 flex items-center gap-1">
                      <span className="text-xl font-medium">@user_id</span>
                      <BsDot size={20} />
                      <span className="text-gray-500">1y</span>
                    </div>

                    <div className="py-2">
                      <p>text is here</p>
                    </div>

                    <div className="pt-2 flex items-center gap-5">
                      <div className="flex items-center gap-1">
                        <GoHeart size={18} />
                        <span>1</span>
                      </div>

                      <div>
                        <IoShareSocialOutline size={18} />
                      </div>

                      <div>
                        <IoTrashOutline color="#ff6467" size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Suggested />
        </div>
      </div>
    </>
  );
};

export default Profile;
