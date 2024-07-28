import { useMutation, useQuery } from "react-query";
import * as apiClient from "../service/api-client";
import ManageHotelForm from "../forms/ManageHotelForm";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastStore from "../context/toastStore";
import { useNavigate } from "react-router-dom";

const ViewHotel = () => {
  const { id } = useParams();
  const showToast = ToastStore((state) => state.showToast);
  const navigate = useNavigate();

  const { isError, isLoading, data } = useQuery(
    ["fetchHotelById", id],
    () => apiClient.getHotelById(id),
    {
      retry: 0,
      onError: (error) => {
        console.log(error);
        showToast("Error fetching hotel data", "ERROR");
      },
    },
  );

  const mutation = useMutation(apiClient.editHotel, {
    onSuccess: () => {
      showToast("Hotel updated successfully", "SUCCESS");
       navigate("/my-hotels");
    },
    onError: (error) => {
      showToast(error.message, "ERROR");
    },
  });

  const handleEdit = (hotel: FormData) => {
    mutation.mutate({id, hotel});
  };

  if (isLoading) {
    return (
      <div className="grid flex-1 place-items-center">
        <Spinner />
      </div>
    );
  }

  return isError ? (
    <div className="grid flex-1 place-items-center">
      <div className="text-3xl font-bold text-gray-400">Hotel not found...</div>
    </div>
  ) : (
    <ManageHotelForm
      onSave={handleEdit}
      isLoading={mutation.isLoading}
      hotel={data}
    />
  );
};

export default ViewHotel;
