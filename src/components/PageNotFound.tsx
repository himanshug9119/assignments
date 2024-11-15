import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-indigo-800 flex items-center justify-center py-6 px-4">
      <div className="max-w-lg w-full text-center bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">
          Oops! Page Not Found
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          The page you're looking for doesn't exist or might have been moved.
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
}
