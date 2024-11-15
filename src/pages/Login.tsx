import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Car } from "lucide-react";
import { FaGithub, FaGoogle, FaMicrosoft, FaFacebook ,FaEye,
  FaEyeSlash, } from "react-icons/fa";
import authStore from "../store/authStore";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { login } = authStore();
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 sm:px-6 lg:px-8">
      {/* Main container */}
      <div className="bg-white shadow-lg rounded-lg w-full sm:w-96 px-6 py-8">
        {/* Logo and Title */}
        <div className="flex items-center justify-center">
          <Car className="h-12 w-12 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">
            CarManager
          </span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            create a new account
          </Link>
        </p>

        {/* Sign-in form */}
        <form className="space-y-6 mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                {...register("email")}
                type="email"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                {...register("password")}
                type={passwordVisible ? "text" : "password"}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Add the span here */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          <span className="text-sm text-gray-600">or you can sign in with</span>
        </div>

        {/* Social login buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          {/* GitHub Button */}
          <button className="flex items-center justify-center p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-200">
            <FaGithub className="h-6 w-6 text-gray-700 hover:text-black" />
          </button>

          {/* Google Button */}
          <button className="flex items-center justify-center p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-200">
            <FaGoogle className="h-6 w-6 text-gray-700 hover:text-red-600" />
          </button>

          {/* Microsoft Button */}
          <button className="flex items-center justify-center p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-200">
            <FaMicrosoft className="h-6 w-6 text-gray-700 hover:text-blue-600" />
          </button>

          {/* Meta Button (Facebook) */}
          <button className="flex items-center justify-center p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-all duration-200">
            <FaFacebook className="h-6 w-6 text-gray-700 hover:text-blue-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
