import Post from "./Post";

const MyProfile = () => {
  return (
    <div className="animate-pulse">
      {/* Cover Image */}
      <div className="w-full h-32 bg-gray-300 rounded-md"></div>

      {/* Profile Image */}
      <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto -mt-12 border-4 border-white"></div>

      <div className="my-5 flex flex-col gap-1">
        {/* Username */}
        <div className="w-24 h-6 my-3 bg-gray-300 rounded mx-auto mt-4"></div>
        <div className="w-16 h-4 bg-gray-300 rounded mx-auto mt-2"></div>

        {/* Joined Date */}
        <div className="w-32 h-4 bg-gray-300 rounded mx-auto mt-2"></div>
      </div>

      {/* Stats (Posts, Followers, Following) */}
      <div className="flex justify-center gap-8 my-">
        <div className="w-14 h-7 bg-gray-300 rounded"></div>
        <div className="w-14 h-7 bg-gray-300 rounded"></div>
        <div className="w-14 h-7 bg-gray-300 rounded"></div>
      </div>

      {/* Edit Profile Button */}
      <div className="w-30 h-10 my-5 bg-gray-300 rounded mx-auto mt-8"></div>

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
          <h3 className="text-lg font-semibold capitalize">Posts</h3>

          {/* Single Post */}
          <div className="my-3">
            {[...Array(2)].map((_, i) => (
              <Post key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
