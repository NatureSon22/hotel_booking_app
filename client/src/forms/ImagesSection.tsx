import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-gray-500">Images</h3>

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
