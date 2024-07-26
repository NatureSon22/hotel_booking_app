import { useQuery } from "react-query";
import * as apiClient from "../service/api-client";
import HotelCard from "../components/HotelCard";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastStore from "../context/toastStore";

const MyHotels = () => {
  const showToast = ToastStore((state) => state.showToast);
  const { isLoading, data: hotelData } = useQuery("fetchHotels", apiClient.getHotels, {
    retry: 0,
    onError: (error) => {
      showToast(error.message, "ERROR");
    },
  });
  const navigate = useNavigate();

  const handleAddHotel = () => {
    navigate("/add-hotels");
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="container mx-auto flex max-w-[65em] flex-1 flex-col gap-10 px-5 py-10 sm:px-10 md:py-20 xl:px-0">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold">My Hotels</h2>

          <button
            type="submit"
            onClick={handleAddHotel}
            className="apply-transition mt-3 rounded-sm bg-blue-800 px-7 py-3 font-bold text-white hover:bg-yellow-400 sm:mr-0"
          >
            Add Hotel
          </button>
        </div>

        {isLoading ? (
          <div className="grid h-full flex-1 place-items-center">
            <Spinner />
          </div>
        ) : (
          <>
            {hotelData?.length === 0 ? (
              <div>No hotels found...</div>
            ) : (
              <ul className="grid gap-12 sm:mt-4 sm:grid-cols-2">
                {hotelData?.map((hotel) => {
                  return <HotelCard key={hotel._id} {...hotel} />;
                })}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyHotels;
