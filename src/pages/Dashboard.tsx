import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useEffect } from "react";
import { useCarStore } from "../store/carStore";

export default function Dashboard() {
  const { cars, searchTerm, setSearchTerm, fetchCars } = useCarStore();

  useEffect(() => {
    if (cars.length === 0) {
      fetchCars();
    }
  }, [cars, fetchCars]);

  const filteredCars = cars.filter((car) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      car.title.toLowerCase().includes(searchLower) ||
      car.description.toLowerCase().includes(searchLower) ||
      Object.values(car.tags).some((tag) =>
        tag.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Cars</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track your vehicle inventory
          </p>
        </div>
        <Link
          to="/cars/new"
          className="inline-flex items-center mt-4 sm:mt-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Car
        </Link>
      </div>

      <div className="mt-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCars.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">
              No cars found. Add your first car to get started!
            </p>
          </div>
        ) : (
          filteredCars.map((car) => (
            <Link
              key={car._id}
              to={`/cars/${car._id}`}
              className="block bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative pb-[56.25%]">
                {" "}
                {/* 16:9 Aspect Ratio */}
                <img
                  src={car.images[0]}
                  alt={car.title}
                  className="object-cover w-full h-full absolute top-0 left-0"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {car.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {car.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(car.tags).map(([key, value]) => (
                    <span
                      key={key}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
