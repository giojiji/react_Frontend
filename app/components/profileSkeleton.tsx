export const ProfileSkeleton = () => {
  return (
    <div className="p-10 flex flex-col justify-center items-center min-h-mainbody bg-slate-300">
      <div className="flex flex-col gap-6 items-left w-96 p-6 bg-white shadow-lg rounded-lg">
        <div className="flex gap-4 justify-start items-center">
          <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="w-32 h-10 bg-gray-300 animate-pulse rounded"></div>
        </div>

        <hr />

        <div className="w-full h-10 bg-gray-300 animate-pulse rounded"></div>
        <div className="w-full h-10 bg-gray-300 animate-pulse rounded"></div>
        <div className="w-full h-10 bg-gray-300 animate-pulse rounded"></div>
        <div className="w-full h-10 bg-gray-300 animate-pulse rounded"></div>

        <hr />

        <div className="flex gap-4">
          <div className="w-24 h-10 bg-gray-300 animate-pulse rounded"></div>
          <div className="w-32 h-10 bg-gray-300 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
};
