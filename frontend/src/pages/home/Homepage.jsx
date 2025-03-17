import Suggested from "../../components/Suggested";
import AllPosts from "../post/AllPosts";
import CreatePost from "./CreatePost";

const Homepage = () => {
  return (
    <>
      <div className="flex">
        <div className="flex flex-col flex-1">
          <h2 className="px-2 py-2 text-2xl font-semibold">Home Feed</h2>
          <CreatePost />
          <AllPosts />
        </div>
        <Suggested />
      </div>
    </>
  );
};

export default Homepage;
