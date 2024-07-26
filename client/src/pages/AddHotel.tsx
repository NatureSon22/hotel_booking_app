import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm";
import * as apiClient from "../service/api-client";
import ToastStore from "../context/toastStore";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
  const navigate = useNavigate();
  const showToast = ToastStore((state) => state.showToast);
  const { mutate, isLoading } = useMutation(apiClient.addHotels, {
    onSuccess: () => {
      showToast("Succesfully added hotel", "SUCCESS");
      navigate("/my-hotels");
    },
    onError: (error: Error) => {
      showToast(error.message, "ERROR");
    },
  });

  const handleSave = (HotelFormData: FormData) => {
    mutate(HotelFormData);
  };

  return (
    <div className="md:py-30 container mx-auto grid max-w-[55em] flex-1 gap-10 px-5 py-20 sm:px-10">
      <h2 className="w-fit rounded-md bg-yellow-200 px-5 py-2 text-2xl font-bold">
        Add Hotel
      </h2>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </div>
  );
};

export default AddHotel;
