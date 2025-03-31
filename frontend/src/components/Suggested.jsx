import { POSTS } from "../db/dummy";

const Suggested = () => {
  return (
    <div className="max-md:hidden w-[250px] px-2 py-2">
      <div>
        <UserSuggestions />
      </div>
    </div>
  );
};

export default Suggested;

export const RecentPosts = () => {
  return (
    <div className="px-2">
      <h2 className="py-3 text-lg text-appColor">Recent Posts</h2>
      <div>
        {POSTS.map((post) => (
          <div key={post._id} className="py-2">
            <p>{post.text}</p>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-400"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const UserSuggestions = () => {
  return (
    <div className="px-2">
      <div>
        <h2 className="py-3 text-lg text-appColor">Suggested Users</h2>
        <div>
          {POSTS.map((post) => (
            <div key={post._id} className="py-2">
              <div className="flex items-start gap-2">
                <img
                  src={post.img || "logo.png"}
                  alt="logo"
                  className="size-10 rounded-full"
                />
                <div className="flex flex-col">
                  <span>@{post.user.username}</span>
                  <span className="capitalize">{post.user.fullName}</span>
                </div>
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
