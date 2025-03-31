import { POSTS } from "../db/dummy";

const RecentPosts = () => {
  return (
    <>
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
    </>
  );
};

export default RecentPosts;
