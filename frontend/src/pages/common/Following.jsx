import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { useAppContext } from "../../context/AppContext";

const Following = () => {
  const { authUser } = useAppContext();

  const unFollow = async () => {
    console.log("User unfollowed!");
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold">Following</h2>

      <section className="py-5 flex flex-col gap-3">
        {/* User profile  */}

        <div className="flex items-center justify-between">
          <div className="px-2 flex items-center gap-1">
            <Link to="profile" className="cursor-pointer">
              {authUser?.profileImg ? (
                <img
                  src={authUser.profileImg}
                  alt="user-profile"
                  className="size-14"
                />
              ) : (
                <>
                  <RxAvatar size={40} color="#1d9bf0" />
                </>
              )}
            </Link>

            <div className="flex flex-col">
              <span className="text-xl font-semibold capitalize">
                {authUser?.username}
              </span>
              <span className="text-gray-500">@{authUser?.username}</span>
            </div>
          </div>

          <div className="px-2">
            <button
              onClick={unFollow}
              className="px-7 py-2 flex justify-center items-center gap-3 rounded bg-appColor text-white cursor-pointer"
            >
              <span className="text-lg font-semibold capitalize">unfollow</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="px-2 flex items-center gap-1">
            <Link to="profile" className="cursor-pointer">
              {authUser?.profileImg ? (
                <img
                  src={authUser.profileImg}
                  alt="user-profile"
                  className="size-14"
                />
              ) : (
                <>
                  <RxAvatar size={40} color="#1d9bf0" />
                </>
              )}
            </Link>

            <div className="flex flex-col">
              <span className="text-xl font-semibold capitalize">
                {authUser?.username}
              </span>
              <span className="text-gray-500">@{authUser?.username}</span>
            </div>
          </div>

          <div className="px-2">
            <button
              onClick={unFollow}
              className="px-7 py-2 flex justify-center items-center gap-3 rounded bg-appColor text-white cursor-pointer"
            >
              <span className="text-lg font-semibold capitalize">unfollow</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Following;
