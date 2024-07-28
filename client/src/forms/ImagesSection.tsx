import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();
  const existingImageUrls = watch("imageURLs");

  const handleRemove = (urlToRemove: string) => {
    setValue(
      "imageURLs",
      existingImageUrls.filter((url) => url !== urlToRemove),
    );
  };

  return (
    <div className="space-y-12">
      <h3 className="mb-4 text-lg font-bold text-gray-500">Images</h3>

      <div className="flex flex-wrap gap-4">
        {existingImageUrls?.map((url) => (
          <div
            className="group relative h-40 w-full items-center xsm:min-w-[20em] xsm:flex-1"
            key={url}
          >
            <img
              src={url}
              className="h-full w-full rounded-md object-cover group-hover:brightness-75"
              alt="images[]:"
            />

            <button
              className="apply-transition absolute right-2 top-2 hidden rounded-md border border-white bg-transparent px-2 py-1 text-white hover:bg-red-500 group-hover:block"
              onClick={() => handleRemove(url)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        {...register("imageFiles", {
          validate: (files) => {
            const length = files.length + ( existingImageUrls?.length || 0 );

            if (length === 0) {
              return "Please select at least one image";
            } else if (length > 6) {
              return "Please select at most five images";
            }

            return true;
          },
        })}
      />

      <div
        className={`ml-auto mt-2 text-[0.75rem] text-red-600 ${
          errors.imageFiles?.message ? "visible" : "invisible"
        }`}
      >
        {errors.imageFiles?.message || "error"}
      </div>
    </div>
  );
};

export default ImagesSection;
