import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useState } from "react";
import { useCarStore } from "../store/carStore";
import authStore from "../store/authStore";
import Loading from "../components/Loading";
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

export default function CarForm() {
  const navigate = useNavigate();
  const { user } = authStore();
  const { addCar } = useCarStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<CarForm>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      images: [],
      tags: { carType: "", company: "", dealer: "" },
    },
  });

  const [imagePreviews, setImagePreviews] = useState<File[]>([]); // To store selected images for preview
  const [uploadedImages, setUploadedImages] = useState<string[]>([]); // To store uploaded image URLs
  const [uploading, setUploading] = useState(false); // To track uploading state
  const [loading, setLoading] = useState(false); // To track loading state for the entire page

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setImagePreviews(fileArray); // Update the preview images

    // Reset images in the form state until upload is triggered
    setValue("images", []);
  };

  const handleImageDelete = (index: number) => {
    // Remove the image from the preview array
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);

    // Update the form state to remove the deleted image
    const updatedImages = [...(getValues("images") as string[])];
    updatedImages.splice(index, 1);
    setValue("images", updatedImages);
  };

  const handleImageUpload = async () => {
    if (uploading) return; // Prevent multiple uploads at once

    setUploading(true);

    try {
      const uploadPromises = imagePreviews.map(async (file) => {
        const fileRef = ref(storage, `cars/${Date.now()}-${file.name}`);
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setUploadedImages(uploadedUrls); // Store uploaded URLs
      setValue("images", uploadedUrls); // Set the uploaded URLs to the form state
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: CarForm) => {
    if (user) {
      setLoading(true); // Start loading
      try {
        await addCar({ ...data, userId: user.id });
        navigate("/");
      } catch (error) {
        console.error("Error adding car:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-6 mt-5 mb-5 px-4 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Add New Car
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="mt-2 w-full p-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-sm"
          />
          {errors.title && (
            <p className="mt-2 text-xs text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className="mt-2 w-full p-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-sm"
          />
          {errors.description && (
            <p className="mt-2 text-xs text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Images
            </label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              multiple
              onChange={(e) => handleFileSelect(e.target.files)}
              disabled={uploading}
              className="mt-2 block w-full p-2 rounded-lg border border-gray-300 text-sm"
            />
            {errors.images && (
              <p className="mt-2 text-xs text-red-600">
                {errors.images.message}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleImageUpload}
            disabled={uploading || imagePreviews.length === 0}
            className="w-full sm:w-auto py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {uploading ? "Uploading..." : "Upload Images"}
          </button>
        </div>

        {imagePreviews.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">
              Preview Images
            </h3>
            <div className="flex flex-wrap gap-3">
              {imagePreviews.map((file, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(index)}
                    className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="carType"
              className="block text-sm font-medium text-gray-700"
            >
              Car Type
            </label>
            <input
              type="text"
              {...register("tags.carType")}
              className="mt-2 w-full p-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-sm"
            />
            {errors.tags?.carType && (
              <p className="mt-2 text-xs text-red-600">
                {errors.tags.carType.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <input
              type="text"
              {...register("tags.company")}
              className="mt-2 w-full p-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-sm"
            />
            {errors.tags?.company && (
              <p className="mt-2 text-xs text-red-600">
                {errors.tags.company.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="dealer"
              className="block text-sm font-medium text-gray-700"
            >
              Dealer
            </label>
            <input
              type="text"
              {...register("tags.dealer")}
              className="mt-2 w-full p-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:outline-none text-sm"
            />
            {errors.tags?.dealer && (
              <p className="mt-2 text-xs text-red-600">
                {errors.tags.dealer.message}
              </p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={uploading || uploadedImages.length === 0}
            className="py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
}
