import { useNavigate } from "react-router-dom";
import { Plus, User, Edit, Trash2 } from "lucide-react";

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-indigo-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-center">
            Admin Dashboard
          </h1>
          <p className="mt-3 text-center text-lg">
            Manage cars, and streamline your operations.
          </p>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate("/users")}
              className="flex items-center bg-gray-100 p-6 rounded-lg shadow hover:bg-gray-200 transition"
            >
              <User className="h-8 w-8 text-indigo-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Manage Users</h3>
                <p className="text-sm text-gray-600">
                  View, edit, or delete user accounts.
                </p>
              </div>
            </button>

            <button
              onClick={() => navigate("/cars/add")}
              className="flex items-center bg-gray-100 p-6 rounded-lg shadow hover:bg-gray-200 transition"
            >
              <Plus className="h-8 w-8 text-indigo-600 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Add Car</h3>
                <p className="text-sm text-gray-600">
                  Quickly add new car listings to the database.
                </p>
              </div>
            </button>

            <button
              onClick={() => navigate("/reports")}
              className="flex items-center bg-gray-100 p-6 rounded-lg shadow hover:bg-gray-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-600 mr-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17 10a5 5 0 11-10 0 5 5 0 0110 0zm-2 0a3 3 0 10-6 0 3 3 0 006 0zm4 5v3H1v-3c0-2 3-4 7-4s7 2 7 4zM5 15c-2 0-3 .5-3 1v1h6v-1c0-.5-1-1-3-1zm10 0c-2 0-3 .5-3 1v1h6v-1c0-.5-1-1-3-1z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold">View Reports</h3>
                <p className="text-sm text-gray-600">
                  Analyze user and car activity reports.
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* User and Car Listings */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Users and Cars Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recently Added Cars
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span>Car Model A - User 1</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate("/")}
                      className="text-indigo-600 hover:underline"
                    >
                      <Edit className="h-4 w-4 inline-block" /> Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      <Trash2 className="h-4 w-4 inline-block" /> Delete
                    </button>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <span>Car Model B - User 2</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate("/")}
                      className="text-indigo-600 hover:underline"
                    >
                      <Edit className="h-4 w-4 inline-block" /> Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      <Trash2 className="h-4 w-4 inline-block" /> Delete
                    </button>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recently Registered Users
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span>User 1</span>
                  <button className="text-red-600 hover:underline">
                    <Trash2 className="h-4 w-4 inline-block" /> Delete
                  </button>
                </li>
                <li className="flex justify-between items-center">
                  <span>User 2</span>
                  <button className="text-red-600 hover:underline">
                    <Trash2 className="h-4 w-4 inline-block" /> Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
