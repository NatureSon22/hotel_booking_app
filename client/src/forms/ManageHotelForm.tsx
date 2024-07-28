import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "../forms/DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  starRating: number;
  facilities: string[];
  pricePerNight: number;
  imageFiles: FileList;
  imageURLs: string[];
  adultCount: number;
  childCount: number;
};

type Prop = {
  onSave: (data: FormData) => void;
  isLoading: boolean;
  hotel?: HotelFormData;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Prop) => {
  const navigate = useNavigate();
  // Initialize form with default values
  const formMethods = useForm<HotelFormData>({
    defaultValues: hotel,
  });
  const { reset } = formMethods;

  // Reset form when hotel prop changes
  useEffect(() => {
    if (hotel) {
      reset(hotel);
    }
  }, [hotel, reset]);

  const onSubmit = (data: HotelFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("starRating", data.starRating.toString());
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());

    data.facilities.forEach((facility, i) => {
      formData.append(`facilities[${i}]`, facility);
    });

    if (data.imageURLs) {
      data.imageURLs.forEach((url, i) => {
        formData.append(`imageURLs[${i}]`, url);
      });
    }

    for (let i = 0; i < data.imageFiles.length; i++) {
      formData.append("imageFiles", data.imageFiles[i]);
    }

    onSave(formData);
  };

  const handleClick = () => {
    navigate(-1); // navigate to the page where the user has previously been
  };

  return (
    <div className="md:py-30 container mx-auto grid max-w-[55em] flex-1 gap-10 px-5 py-20 sm:px-10">
      {hotel?._id ? (
        <button
          className="w-fit rounded-md bg-blue-200 px-5 py-2 text-2xl font-bold"
          onClick={handleClick}
        >
          Back
        </button>
      ) : (
        <h2 className="w-fit rounded-md bg-yellow-200 px-5 py-2 text-2xl font-bold">
          Add Hotel
        </h2>
      )}

      <FormProvider {...formMethods}>
        <form
          className="grid gap-5"
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestsSection />
          <ImagesSection />

          <button
            type="submit"
            disabled={isLoading}
            className={`mx-auto mt-7 w-fit cursor-pointer rounded-sm px-7 py-4 font-bold text-white sm:mr-0 ${isLoading ? "bg-blue-500/80" : "bg-blue-500"}`}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ManageHotelForm;
