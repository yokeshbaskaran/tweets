import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../context/AppContext";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import useFollow from "../hooks/useFollow";
import toast from "react-hot-toast";
import Suggestion from "./skeleton/Suggestion";

const Suggested = () => {
  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await axios.get(API_URL + "/users/suggested", {
          withCredentials: true,
        });
        const data = await res.data;
        return data;
      } catch (error) {
        console.log("Error in suggested", error);
      }
    },
  });

  const { follow, isPending } = useFollow();

  return (
    <div>
      {/* Suggested All Users  */}
      <div>
        {suggestedUsers?.length > 0 && (
          <UserSuggestions
            suggestedUsers={suggestedUsers}
            follow={follow}
            isPending={isPending}
          />
        )}

        {isLoading && (
          <>
            {[...Array(5)].map((_, i) => (
              <Suggestion key={i} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Suggested;

export const UserSuggestions = ({ suggestedUsers, follow }) => {
  const handleFollow = (id, name) => {
    follow(id);
    toast.success(`you followed ${name}`);
  };

  return (
    <>
      {/* Single Suggested user */}
      <div className="px-3">
        <h2 className="text-lg text-appColor">Suggested Users</h2>

        <div>
          {suggestedUsers &&
            suggestedUsers.map((post) => (
              <div key={post._id} className="py-2">
                <div className="flex items-start gap-2">
                  <div className="size-14 md:hidden -mt-1 object-cover rounded-full">
                    {post?.profileImg ? (
                      <img
                        src={post.profileImg}
                        alt="user-profile"
                        className="size-full object-contain"
                      />
                    ) : (
                      <>
                        <RxAvatar className="size-full px-1" />
                      </>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <Link
                      to={`/user/profile/${post.username}`}
                      className="capitalize font-semibold"
                    >
                      {post.username}
                    </Link>
                    <span className="text-gray-500">@{post.username}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleFollow(post._id, post.username);
                    }}
                    className="ml-auto self-center capitalize m-1 px-3 py-1 rounded-4xl bg-appColor text-white hover:scale-105 transition-transform cursor-pointer"
                  >
                    <span className="px-1">follow</span>
                  </button>
                </div>

                {/* divider  */}
                <div className="relative m-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300"></span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
