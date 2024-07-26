import { useQuery } from "react-query";
import * as apiClient from "../service/api-client";
import HotelStore from "../context/hotelStore";
import ManageHotelForm from "../forms/ManageHotelForm";
import { useParams } from "react-router-dom";

const ViewHotel = () => {
  const setHotel = HotelStore((state) => state.setHotel);
  const { id } = useParams();

  const { isError, isLoading } = useQuery(
    ["fetchHotelById", id],
    () => apiClient.getHotelById(id),
    {
      retry: 0,
      refetchOnWindowFocus: true,
      onSuccess: (data) => setHotel(data),
    },
  );

  const handleEdit = () => {};

  return isError ? (
    <>Hotel not found</>
  ) : isLoading ? (
    <>Loading...</>
  ) : (
    <ManageHotelForm onSave={handleEdit} isLoading={false} />
  );
};

export default ViewHotel;
