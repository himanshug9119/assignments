import { useParams, useNavigate } from "react-router-dom";
import { Trash2, Edit, ChevronLeft } from "lucide-react";
import { useCarStore } from "../store/carStore";
import authStore from "../store/authStore";
import { useEffect, useState } from "react";

export default function CarDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cars, fetchCars, deleteCar } = useCarStore();
  const { user } = authStore();

  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Fetch cars if not already loaded
    if (cars.length === 0) {
      fetchCars();
    } else {
      // Find the car based on the ID from URL
      const foundCar = cars.find((c) => c._id === id);
      setCar(foundCar);
      setLoading(false);
    }
  }, [cars, id, fetchCars]);

  useEffect(() => {
    if (car && car.images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % car.images.length
        );
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [car]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-5 sm:px-6">
          <p className="text-center text-gray-500">Car not found</p>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      deleteCar(car._id);
      navigate("/");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to list
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{car.title}</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Added on {new Date(car.createdAt).toLocaleDateString()}
            </p>
          </div>
          {user && user.id === car.userId && (
            <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
              <button
                onClick={() => navigate(`/cars/${car._id}/edit`)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Description
                </h3>
                <p className="mt-1 text-gray-500">{car.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Tags</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {Object.entries(car.tags).map(([key, value]) => (
                    <span
                      key={key}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {key}: {value as string}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                {car.images.length > 0 && (
                  <img
                    src={car.images[currentImageIndex]}
                    alt={`${car.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-64 sm:h-72 object-cover rounded-lg transition-all duration-500 ease-in-out"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        (currentImageIndex - 1 + car.images.length) %
                          car.images.length
                      )
                    }
                    className="bg-black text-white p-2 rounded-full opacity-50 hover:opacity-100"
                  >
                    &#8249;
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        (currentImageIndex + 1) % car.images.length
                      )
                    }
                    className="bg-black text-white p-2 rounded-full opacity-50 hover:opacity-100"
                  >
                    &#8250;
                  </button>
                </div>
              </div>

              {/* Bullet Points for Image Indexing */}
              <div className="flex justify-center space-x-2 mt-2">
                {car.images.map((_: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentImageIndex === index
                        ? "bg-indigo-600"
                        : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
