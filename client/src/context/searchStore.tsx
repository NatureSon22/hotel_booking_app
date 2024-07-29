import { create } from "zustand";

type SearchStoreType = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adultCount: number;
  childCount: number;
  hotelId?: string;
  saveSearchValues: (
    destination: string,
    checkIn: string,
    checkOut: string,
    adultCount: number,
    childCount: number,
    hotelId?: string,
  ) => void;
  clear: () => void;
};

const SearchStore = create<SearchStoreType>((set) => ({
  destination: "",
  checkIn: new Date().toISOString().split("T")[0],
  checkOut: new Date().toISOString().split("T")[0],
  adultCount: 1,
  childCount: 1,
  hotelId: "",
  saveSearchValues: (
    destination: string,
    checkIn: string,
    checkOut: string,
    adultCount: number,
    childCount: number,
    hotelId?: string,
  ) =>
    set({
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
      hotelId,
    }),
  clear: () =>
    set({
      destination: "",
      checkIn: new Date().toISOString().split("T")[0],
      checkOut: new Date().toISOString().split("T")[0],
      hotelId: "",
      adultCount: 1,
      childCount: 1,
    }),
}));

export default SearchStore;
