import { LogOut, Car } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import authStore from "../store/authStore";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = authStore();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false); 

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-indigo-700 bg-indigo-100"
      : "text-gray-700 hover:bg-indigo-100";

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Car className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                CarManager
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Home Button - Available to all users */}
            {location.pathname !== "/" && (
              <Link
                to="/"
                className={`inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md ${isActive(
                  "/"
                )}`}
              >
                Home
              </Link>
            )}

            {location.pathname !== "/documentation" && (
              <Link
                to="/documentation"
                className={`inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md ${isActive(
                  "/documentation"
                )}`}
              >
                Documentation
              </Link>
            )}
            {/* Portfolio Button - Available to all users */}
            <a
              href="https://himanshugupta.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium text-gray-700 hover:bg-indigo-100"
            >
              My Portfolio
            </a>
            {user ? (
              <>
                <span className="text-gray-700">Welcome, {user.name}</span>
                {/* Dashboard Button */}
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md ${isActive(
                    "/dashboard"
                  )}`}
                >
                  Dashboard
                </Link>
                {/* Profile Button */}
                <Link
                  to={`/profile/${user.id}`}
                  className={`inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md ${isActive(
                    `/profile/${user.id}`
                  )}`}
                >
                  Profile
                </Link>
                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                {location.pathname !== "/login" && (
                  <Link
                    to="/login"
                    className="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                  >
                    Login
                  </Link>
                )}
                {location.pathname !== "/register" &&
                  location.pathname !== "/login" && (
                    <span className="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium text-gray-700">
                      {" "}
                      or{" "}
                    </span>
                  )}
                {location.pathname !== "/register" && (
                  <Link
                    to="/register"
                    className="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                  >
                    Register
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-white shadow-md`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Home Button - Available to all users */}
          <Link
            to="/"
            className={`block w-full text-left px-3 py-2 text-sm rounded-md ${isActive(
              "/"
            )}`}
            onClick={closeMenu}
          >
            Home
          </Link>

          {/* Portfolio Button - Available to all users */}
          <a
            href="https://himanshugupta.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-indigo-100"
            onClick={closeMenu}
          >
            My Portfolio
          </a>
          <Link
            to="/documentation"
            className={`block w-full text-left px-3 py-2 text-sm rounded-md ${isActive(
              "/"
            )}`}
            onClick={closeMenu}
          >
            Documentation
          </Link>
          {user ? (
            <>
              <span className="block px-3 py-2 text-sm text-gray-700">
                Welcome, {user.name}
              </span>
              <Link
                to="/dashboard"
                className={`block w-full text-left px-3 py-2 text-sm rounded-md ${isActive(
                  "/dashboard"
                )}`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Link
                to={`/profile/${user.id}`}
                className={`block w-full text-left px-3 py-2 text-sm rounded-md ${isActive(
                  `/profile/${user.id}`
                )}`}
                onClick={closeMenu}
              >
                Profile
              </Link>

              <button
                onClick={logout}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 mr-2 inline" />
                Logout
              </button>
            </>
          ) : (
            <>
              {location.pathname !== "/login" && (
                <Link
                  to="/login"
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-indigo-100"
                  onClick={closeMenu}
                >
                  Login
                </Link>
              )}
              {location.pathname !== "/register" && (
                <Link
                  to="/register"
                  className="block w-full text-left px-3 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
