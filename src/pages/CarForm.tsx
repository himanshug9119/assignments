import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { useCarStore } from "../store/carStore";
import authStore from "../store/authStore";

const carSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z
    .array(z.string().url("Must be a valid URL"))
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
    watch,
    setValue,
  } = useForm<CarForm>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      images: [""],
      tags: {
        carType: "",
        company: "",
        dealer: "",
      },
    },
  });

  const images = watch("images");

  const onSubmit = (data: CarForm) => {
    if (user) {
      addCar({
        ...data,
        userId: user.id,
      });
      navigate("/");
    }
  };

  const addImageField = () => {
    if (images.length < 10) {
      setValue("images", [...images, ""]);
    }
  };

  const removeImageField = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setValue("images", newImages);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Car</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images (URLs)
          </label>
          {images.map((_, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="url"
                {...register(`images.${index}`)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://example.com/image.jpg"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          {images.length < 10 && (
            <button
              type="button"
              onClick={addImageField}
              className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
            >
              Add another image
            </button>
          )}
          {errors.images && (
            <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
          )}
        </div>

        {/* Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Car Type */}
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.tags?.carType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.tags.carType.message}
              </p>
            )}
          </div>

          {/* Company */}
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.tags?.company && (
              <p className="mt-1 text-sm text-red-600">
                {errors.tags.company.message}
              </p>
            )}
          </div>

          {/* Dealer */}
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.tags?.dealer && (
              <p className="mt-1 text-sm text-red-600">
                {errors.tags?.dealer.message}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Car
          </button>
        </div>
      </form>
    </div>
  );
}
