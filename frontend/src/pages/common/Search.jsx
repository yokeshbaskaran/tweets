import { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { AiOutlineSend } from "react-icons/ai";
import Suggested from "../../components/Suggested";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL, useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

const Search = () => {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  const { data: allUsers } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      try {
        const res = await axios.get(API_URL + "/users/all", {
          withCredentials: true,
        });

        const data = await res.data;
        return data;
      } catch (error) {
        console.log("Error in allUsers", error);
      }
    },
  });

  console.log("allUsers", allUsers);

  return (
    <>
      <section>
        <h2 className="p-1 pt-2 text-2xl font-semibold">Search </h2>

        <div className="w-full flex">
          <div className="w-full md:w-9/12">
            {/* Search bar  */}

            <div className="flex my-3 items-center border-2 border-gray-300 rounded-md overflow-hidden focus-within:border-appColor ">
              {/* Search Icon */}
              <div className="px-3 text-gray-500">
                <IoSearch size={20} />
              </div>

              {/* Input Field */}
              <input
                ref={inputRef}
                type="text"
                placeholder="Search User here"
                className="flex-1 px-1 py-2 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* Send Button */}
              {/* <button className="px-4 py-2 border border-gray-300 bg-white rounded-md shadow-md hover:opacity-85">
                <AiOutlineSend size={18} className="text-appColor" />
              </button> */}
            </div>

            <div className="my-8 px-1">
              {search.trim() !== "" ? (
                allUsers?.filter((item) =>
                  item?.username.toLowerCase().includes(search.toLowerCase())
                ).length > 0 ? (
                  allUsers
                    ?.filter((item) =>
                      item?.username
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    )
                    ?.map((user, idx) => <SearchedUser key={idx} user={user} />)
                ) : (
                  <p>Username not found!</p>
                )
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Suggested users */}
          <div className="w-3/12 max-md:hidden">
            <Suggested />
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;

export const SearchedUser = ({ user }) => {
  const { authUser } = useAppContext();
  const isMyProfile = authUser?.username === user?.username;

  const { username, profileImg } = user;
  // console.log("user=", user);

  return (
    <div>
      <div className="my-2 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            to={isMyProfile ? `/myprofile` : `/user/profile/${username}`}
            className="size-14 -mt-1 object-cover rounded-full"
          >
            {/* Profile Image Container */}
            {profileImg ? (
              <img
                src={profileImg}
                alt="user-pic"
                className="size-full object-contain"
              />
            ) : (
              <RxAvatar color="#1d9bf0" className="size-full px-2" />
            )}
          </Link>

          <Link to={`/user/profile/${username}`} className="flex flex-col">
            <span className="text-xl font-semibold capitalize">{username}</span>
            <span className="text-gray-500">@{username}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
