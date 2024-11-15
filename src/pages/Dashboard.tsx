import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { useCarStore } from "../store/carStore";
import { CarCard } from "../components/CarCard";
import  Loading  from "../components/Loading";

export default function Dashboard() {
  const { cars, searchTerm, setSearchTerm, fetchCars } = useCarStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      await fetchCars();
      setLoading(false);
    };

    if (cars.length === 0) {
      loadCars();
    } else {
      setLoading(false);
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
        {loading ? (
          <div className="col-span-full">
            <Loading />
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">
              No cars found. Add your first car to get started!
            </p>
          </div>
        ) : (
          filteredCars.map((car) => <CarCard key={car._id} car={car} />)
        )}
      </div>
    </div>
  );
}
