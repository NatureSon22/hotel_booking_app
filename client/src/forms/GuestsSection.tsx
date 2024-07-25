import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-gray-500">Guests</h3>

      <div className="flex flex-col gap-8 rounded-md bg-gray-100/50 p-7 sm:flex-row">
        <label className="flex flex-1 flex-col gap-3">
          <span className="text-sm font-semibold">Adults Count</span>
          <input
            className="rounded-sm border border-gray-300 px-4 py-3 text-sm"
            type="number"
            {...register("adultCount", {
              required: "This field is required",
              valueAsNumber: true,
              min: 1,
            })}
          />
          <div
            className={`ml-auto text-[0.75rem] text-red-600 ${
              errors.adultCount?.message ? "visible" : "invisible"
            }`}
          >
            {errors.adultCount?.message || "error"}
          </div>
        </label>
        <label className="flex flex-1 flex-col gap-3">
          <span className="text-sm font-semibold">Children Count</span>
          <input
            className="rounded-sm border border-gray-300 px-4 py-3 text-sm"
            type="number"
            {...register("childCount", {
              required: "This field is required",
              valueAsNumber: true,
              min: 1,
            })}
          />
          <div
            className={`ml-auto text-[0.75rem] text-red-600 ${
              errors.childCount?.message ? "visible" : "invisible"
            }`}
          >
            {errors.childCount?.message || "error"}
          </div>
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
