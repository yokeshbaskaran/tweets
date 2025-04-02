import Suggested from "../../components/Suggested";
import { useAppContext } from "../../context/AppContext";
import AllPosts from "../post/AllPosts";

const Homepage = () => {
  const { authUser } = useAppContext();
  return (
    <>
      <div className="px-2 flex">
        <div className="flex flex-col flex-1">
          <h2 className="pt-2 text-2xl font-semibold">Home Feed</h2>
          <AllPosts />
        </div>
        {authUser && <Suggested />}
      </div>
    </>
  );
};

export default Homepage;
