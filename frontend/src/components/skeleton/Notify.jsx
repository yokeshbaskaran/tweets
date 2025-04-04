const Notify = () => {
  return (
    <>
      <section className="py-3 border-gray-200">
        <div className="flex items-center gap-4">
          {/* Circle Avatar */}
          <div className="size-12 p-6 bg-gray-300 object-cover rounded-full animate-pulse"></div>

          <div className="w-full flex justify-between items-center">
            <div className="w-1/2 h-4 my-1 bg-gray-300 rounded animate-pulse"></div>

            <div className="size-8 p-4 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Notify;
