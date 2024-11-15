
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex justify-center items-center space-x-3">
        <div className="w-12 h-12 border-4 border-t-4 border-indigo-600 rounded-full animate-spin"></div>
        <span className="text-xl font-semibold text-gray-800">Loading...</span>
      </div>
      <div className="mt-4 text-gray-600 text-sm">
        Please wait, we are processing your request.
      </div>
    </div>
  );
};

export default Loading;
