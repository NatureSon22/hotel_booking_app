import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  console.log(getValues("imageFiles"));

  return (
    <div className="space-y-12">
      <h3 className="mb-4 text-lg font-bold text-gray-500">Images</h3>

      <div className="flex flex-wrap gap-4">
        {getValues("imageFiles")?.map((url) => (
          <div className="h-40 w-full xsm:flex-1 xsm:min-w-[20em] items-center" key={url}>
            <img src={url} className="object-cover w-full h-full rounded-md" />
          </div>
        ))}
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        {...register("imageFiles", {
          validate: (files) => {
            const length = files.length;

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
