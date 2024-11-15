import { useState } from "react";
import { Link } from "react-router-dom";

export function CarCard({ car }: { car: any }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      to={`/cars/${car._id}`}
      className="block bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative pb-[56.25%]">
        {" "}
        {/* 16:9 Aspect Ratio */}
        {!isImageLoaded && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-300 animate-pulse"></div>
        )}
        <img
          src={car.images[0]}
          alt={car.title}
          className={`object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-300 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{car.title}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {car.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(car.tags).map(([key, value]) => (
            <span
              key={key}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {value as string}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
