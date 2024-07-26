import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "../forms/DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import HotelStore from "../context/hotelStore";

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
  adultCount: number;
  childCount: number;
};

type Prop = {
  onSave: (data: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Prop) => {
  const hotel = HotelStore((state) => state.hotel);
  const formMethods = useForm<HotelFormData>({
    defaultValues: { ...hotel, imageFiles: hotel.imageURLs },
  });

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

    for (let i = 0; i < data.facilities.length; i++) {
      formData.append(`facilities[${i}]`, data.facilities[i]);
    }

    for (let i = 0; i < data.imageFiles.length; i++) {
      formData.append("imageFiles", data.imageFiles[i]);
    }

    onSave(formData);
  };

  return (
    <div className="md:py-30 container mx-auto grid max-w-[55em] flex-1 gap-10 px-5 py-20 sm:px-10">
      <h2 className="w-fit rounded-md bg-yellow-200 px-5 py-2 text-2xl font-bold">
        Add Hotel
      </h2>
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
