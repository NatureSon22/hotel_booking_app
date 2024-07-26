import { useState } from "react";
import { hotelTypes } from "../config/hotel-options-config";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues
  } = useFormContext<HotelFormData>();
  const [hotelType, setHotelType] = useState(getValues("type"));

  const handleClick = (value: string) => {
    setHotelType(value);
    setValue("type", value);
  };

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-gray-500">Types</h3>

      <div className="grid gap-3">
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {hotelTypes.map((hotel) => (
            <li
              key={hotel}
              className={`apply-transition grid cursor-pointer place-items-center rounded-md border p-3 text-center hover:border-gray-400 ${hotelType === hotel ? "bg-gray-500 text-white" : "bg-gray-200/60 text-gray-700"} `}
              onClick={() => handleClick(hotel)}
            >
              <span>{hotel}</span>
            </li>
          ))}
        </ul>

        <div
          className={`ml-auto text-[0.75rem] text-red-600 ${
            errors.type?.message ? "visible" : "invisible"
          }`}
        >
          {errors.type?.message || "error"}
        </div>
        <input
          type="hidden"
          {...register("type", { required: "This field is required" })}
        />
      </div>
    </div>
  );
};

export default TypeSection;
