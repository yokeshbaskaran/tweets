import AllPosts from "../post/AllPosts";

const Homepage = () => {
  return (
    <>
      <div className="flex">
        <div className="px-1 flex flex-col flex-1">
          <h2 className="pt-2 text-2xl font-semibold">Home Feed</h2>

          <AllPosts />
        </div>
      </div>
    </>
  );
};

export default Homepage;
