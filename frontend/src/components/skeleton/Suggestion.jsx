const Suggestion = () => {
  return (
    <>
      <div className="flex items-center gap-4 px-2 py-2 border-gray-200">
        {/* Circle Avatar */}
        <div className="size-12 px-6 bg-gray-300 object-cover rounded-full animate-pulse"></div>

        <div className="flex flex-col gap-2 w-full">
          {/* Name Placeholder */}
          <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
          {/* Username Placeholder */}
          <div className="w-1/2 h-3 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Button Placeholder */}
        <div className="w-24 h-8 mx-2 px-3 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </>
  );
};

export default Suggestion;
