import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useCarStore } from "../store/carStore";
import authStore from "../store/authStore";
import Loader from "../components/Loading"; // Import your Loader component

const carSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z
    .array(z.string())
    .min(1, "At least one image is required")
    .max(10, "Maximum 10 images allowed"),
  tags: z.object({
    carType: z.string().min(1, "Car type is required"),
    company: z.string().min(1, "Company is required"),
    dealer: z.string().min(1, "Dealer is required"),
  }),
});

type CarForm = z.infer<typeof carSchema>;

export default function EditCarForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = authStore();
  const { cars, updateCar } = useCarStore();

  const car = cars.find((c) => c._id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<CarForm>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      images: [],
      tags: { carType: "", company: "", dealer: "" },
    },
  });

  const [imagePreviews, setImagePreviews] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading effect

  useEffect(() => {
    if (car) {
      reset({
        title: car.title,
        description: car.description,
        images: car.images,
        tags: car.tags,
      });
      setImagePreviews([]);
      setLoading(false); // Stop loading once the car data is set
    } else {
      navigate("/");
    }
  }, [car, reset, navigate]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setImagePreviews(fileArray);
    setValue("images", []);
  };

  const handleImageDelete = (index: number) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);

    const updatedImages = [...(watch("images") as string[])];
    updatedImages.splice(index, 1);
    setValue("images", updatedImages);
  };

  const handleImageUpload = async () => {
    if (uploading) return;

    setUploading(true);

    try {
      const uploadPromises = imagePreviews.map(async (file) => {
        const fileRef = ref(storage, `cars/${Date.now()}-${file.name}`);
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setUploadedImages(uploadedUrls);
      setValue("images", uploadedUrls);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (data: CarForm) => {
    if (user && car && user.id === car.userId) {
      updateCar(car._id, data);
      navigate(`/cars/${car._id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader /> {/* Render your Loader component here */}
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-6 mt-5 mb-5 px-4 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-700 text-white mb-6 p-4 text-center rounded-md">
        Edit Car
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Upload Images */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Upload Images
          </label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
          )}
          <button
            type="button"
            onClick={handleImageUpload}
            disabled={uploading || imagePreviews.length === 0}
            className="mt-2 text-sm text-blue-600"
          >
            {uploading ? "Uploading..." : "Upload Images"}
          </button>
        </div>

        {/* Image Previews */}
        <div className="flex gap-4 mt-4">
          {imagePreviews.length > 0 &&
            imagePreviews.map((file, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="object-cover w-full h-full rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(index)}
                  className="absolute top-0 right-0 p-1 text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          {car?.images?.map((image, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={image}
                alt={`Uploaded ${index}`}
                className="object-cover w-full h-full rounded-md"
              />
              <button
                type="button"
                onClick={() => handleImageDelete(index)}
                className="absolute top-0 right-0 p-1 text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-6">
          <div className="flex flex-col">
            <label
              htmlFor="carType"
              className="text-sm font-medium text-gray-700"
            >
              Car Type
            </label>
            <input
              type="text"
              id="carType"
              className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("tags.carType")}
            />
            {errors.tags?.carType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tags.carType.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="company"
              className="text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("tags.company")}
            />
            {errors.tags?.company && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tags.company.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="dealer"
              className="text-sm font-medium text-gray-700"
            >
              Dealer
            </label>
            <input
              type="text"
              id="dealer"
              className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("tags.dealer")}
            />
            {errors.tags?.dealer && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tags.dealer.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
