import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h3 className="mb-2 text-lg font-bold text-gray-500">Details</h3>
      <label className="flex flex-1 flex-col gap-2">
        <span className="text-sm font-semibold">Name</span>
        <input
          {...register("name", {
            required: "This field is required",
          })}
          type="text"
          className="rounded-sm border border-gray-300 px-4 py-3"
        />
        <div
          className={`ml-auto text-[0.75rem] text-red-600 ${
            errors.name?.message ? "visible" : "invisible"
          }`}
        >
          {errors.name?.message || "error"}
        </div>
      </label>

      <div className="gap-10 sm:flex">
        <label className="flex flex-1 flex-col gap-2">
          <span className="text-sm font-semibold">City</span>
          <input
            {...register("city", {
              required: "This field is required",
            })}
            type="text"
            className="rounded-sm border border-gray-300 px-4 py-3"
          />
          <div
            className={`ml-auto text-[0.75rem] text-red-600 ${
              errors.city?.message ? "visible" : "invisible"
            }`}
          >
            {errors.city?.message || "error"}
          </div>
        </label>

        <label className="flex flex-1 flex-col gap-2">
          <span className="text-sm font-semibold">Country</span>
          <input
            {...register("country", {
              required: "This field is required",
            })}
            type="text"
            className="rounded-sm border border-gray-300 px-4 py-3"
          />
          <div
            className={`ml-auto text-[0.75rem] text-red-600 ${
              errors.country?.message ? "visible" : "invisible"
            }`}
          >
            {errors.country?.message || "error"}
          </div>
        </label>
      </div>

      <label className="flex flex-1 flex-col gap-2">
        <span className="text-sm font-semibold">Description</span>
        <textarea
          {...register("description", {
            required: "This field is required",
          })}
          rows={5}
          className="resize-none rounded-sm border border-gray-300 px-4 py-3"
        />
        <div
          className={`ml-auto text-[0.75rem] text-red-600 ${
            errors.description?.message ? "visible" : "invisible"
          }`}
        >
          {errors.description?.message || "error"}
        </div>
      </label>

      <div className="gap-10 sm:flex">
        <label className="flex flex-1 flex-col gap-2">
          <span className="text-sm font-semibold">Price per Night</span>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">&#36;</span>
            <input
              {...register("pricePerNight", {
                required: "This field is required",
              })}
              type="number"
              min={1}
              className="w-full rounded-sm border border-gray-300 px-4 py-3"
            />
          </div>

          <div
            className={`ml-auto text-[0.75rem] text-red-600 ${
              errors.pricePerNight?.message ? "visible" : "invisible"
            }`}
          >
            {errors.pricePerNight?.message || "error"}
          </div>
        </label>

        <label className="flex flex-1 flex-col gap-2">
          <span className="text-sm font-semibold">Rating</span>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">&#9733;</span>
            <select
              {...register("starRating", {
                required: "This field is required",
              })}
              className="w-full rounded-sm border border-gray-300 px-4 py-3 font-semibold text-gray-500"
            >
              <option value="">Select a rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div
            className={`ml-auto text-[0.75rem] text-red-600 ${
              errors.starRating?.message ? "visible" : "invisible"
            }`}
          >
            {errors.starRating?.message || "error"}
          </div>
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
