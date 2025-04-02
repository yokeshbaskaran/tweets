import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../context/AppContext";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import useFollow from "../hooks/useFollow";

const Suggested = () => {
  const { data: suggestedUsers } = useQuery({
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
    <div className="max-md:hidden w-[220px] px-2 py-2">
      <div>
        {suggestedUsers?.length > 0 && (
          <UserSuggestions
            suggestedUsers={suggestedUsers}
            follow={follow}
            isPending={isPending}
          />
        )}
      </div>
    </div>
  );
};

export default Suggested;

export const UserSuggestions = ({ suggestedUsers, follow }) => {
  return (
    <div className="px-2">
      <div>
        <h2 className="py-3 text-lg text-appColor">Suggested Users</h2>
        <div>
          {suggestedUsers &&
            suggestedUsers.map((post) => (
              <div key={post._id} className="py-2">
                <div className="flex items-start gap-2">
                  <div className="size-14 -mt-1 object-cover rounded-full">
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
                      follow(post._id);
                    }}
                    className="ml-auto self-center capitalize m-1 px-3 py-1 rounded-4xl bg-appColor text-white hover:scale-105 transition-transform cursor-pointer"
                  >
                    <span className="px-1">follow</span>
                  </button>
                </div>

                {/* divider  */}
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-400"></span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
