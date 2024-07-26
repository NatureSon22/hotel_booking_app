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
    <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
  );
};

export default AddHotel;
