import { useMutation } from "react-query";
import * as apiClient from "../service/api-client";
import { useEffect } from "react";
import HotelCard from "../components/HotelCard";
import { useNavigate } from "react-router-dom";

const MyHotels = () => {
  const mutate = useMutation(apiClient.getHotels, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    mutate.mutate();
  }, []);

  const handleAddHotel = () => {
    navigate("/add-hotels");
  };

  return (
    <div className="flex-1 font-open">
      <div className="container mx-auto grid max-w-[65em] gap-10 px-5 py-10 sm:px-10 md:py-20 xl:px-0">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-extrabold">My Hotels</h2>

          <button
            type="submit"
            onClick={handleAddHotel}
            className="apply-transition mt-3 rounded-sm bg-blue-800 px-7 py-3 font-bold text-white hover:bg-yellow-400 sm:mr-0"
          >
            Add Hotel
          </button>
        </div>

        <ul className="grid gap-12 sm:mt-4 sm:grid-cols-2">
          {mutate.data?.map((hotel) => {
            return <HotelCard key={hotel._id} {...hotel} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default MyHotels;
