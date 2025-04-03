const Post = () => {
  return (
    <>
      <section className="px-2 py-3 border-gray-200">
        <div className="flex items-start gap-4">
          {/* Circle Avatar */}
          <div className="size-12 px-6 bg-gray-300 object-cover rounded-full animate-pulse"></div>

          <div className="w-full">
            <div className="flex gap-2">
              <div className="w-full">
                <div className="w-1/2 h-4 my-1 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-1/6 h-3 my-1 bg-gray-300 rounded animate-pulse"></div>
              </div>

              {/* Delete(owner) Placeholder */}
              <div className="size-5 p-4 bg-gray-300 rounded-full animate-pulse"></div>
            </div>

            <div className="w-full pt-3">
              {/* text */}
              <div className="w-full h-3 my-2 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-full h-3 my-2 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-1/2 h-3 my-2 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Post;
