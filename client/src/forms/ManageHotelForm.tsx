import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "../forms/DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";

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

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>({});

  const onSubmit = (data: HotelFormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...formMethods}>
      <form className="grid gap-5" onSubmit={formMethods.handleSubmit(onSubmit)} >
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
