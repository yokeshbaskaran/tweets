import Suggested from "../../components/Suggested";
import AllPosts from "../post/AllPosts";

const Homepage = () => {
  return (
    <>
      <div className="flex">
        <div className="flex flex-col flex-1">
          <h2 className="px-2 py-2 text-2xl font-semibold">Home Feed</h2>
          <AllPosts />
        </div>
        <Suggested />
      </div>
    </>
  );
};

export default Homepage;
