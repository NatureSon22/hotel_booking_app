import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../config/hotel-options-config";

const FacilitiesSection = () => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();
  const watchFacilities = watch("facilities");

  const handleCheckboxChange = (facility: string) => {
    const currentFacilities = watchFacilities || [];
    if (currentFacilities.includes(facility)) {
      setValue(
        "facilities",
        currentFacilities.filter((f) => f !== facility),
      );
    } else {
      setValue("facilities", [...currentFacilities, facility]);
    }
  };

  return (
    <div className="grid">
      <h3 className="mb-2 text-lg font-bold text-gray-500">Details</h3>
      <div>
        <ul className="grid grid-cols-3 gap-6 sm:grid-cols-4">
          {hotelFacilities.map((facility) => (
            <li key={facility} className="flex items-center gap-2 p-2">
              <input
                type="checkbox"
                id={`facility-${facility}`}
                value={facility}
                checked={(watchFacilities || [] ).includes(facility)}
                onChange={() => handleCheckboxChange(facility)}
              />
              <label htmlFor={`facility-${facility}`}>{facility}</label>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`ml-auto text-[0.75rem] text-red-600 ${
          errors.facilities ? "visible" : "invisible"
        }`}
      >
        {errors.facilities?.message || "error"}
      </div>
      <input
        type="hidden"
        {...register("facilities", {
          validate: (value) =>
            value.length > 0 || "Please select at least one facility",
        })}
      />
    </div>
  );
};

export default FacilitiesSection;
