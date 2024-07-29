import SearchStore from "../context/searchStore";
import { useState } from "react";

const useSearch = () => {
  const search = SearchStore((state) => state);
  const [destination, setDestination] = useState(search.destination);
  const [checkIn, setCheckIn] = useState(search.checkIn);
  const [checkOut, setCheckOut] = useState(search.checkOut);
  const [adultCount, setAdultCount] = useState(search.adultCount);
  const [childCount, setChildCount] = useState(search.childCount);
  const [hotelId, setHotelId] = useState(search.hotelId);

  return {
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    hotelId,
    setDestination,
    setCheckIn,
    setCheckOut,
    setAdultCount,
    setChildCount,
    setHotelId,
    saveSearchValues: (
      destination: string,
      checkIn: string,
      checkOut: string,
      adultCount: number,
      childCount: number,
      hotelId?: string,
    ) => {
      search.saveSearchValues(
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
      );
    },
    clear: () => {
      search.clear();
      setDestination(search.destination);
      setCheckIn(search.checkIn);
      setCheckOut(search.checkOut);
      setAdultCount(search.adultCount);
      setChildCount(search.childCount);
      setHotelId(search.hotelId);
    },
  };
};

export default useSearch;
