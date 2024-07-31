import { create } from "zustand";

type SortOption = "starRating" | "pricePerNightAsc" | "pricePerNightDesc" | "";

type SearchStoreType = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  types: string[];
  stars: string[];
  sortOption?: SortOption;
  maxPrice?: string;
  hotelId?: string;
  saveSearchValues: (
    destination: string,
    checkIn: string,
    checkOut: string,
    adultCount: number,
    childCount: number,
    hotelId?: string,
  ) => void;
  setSortOption: (sortOption: SortOption) => void;
  addFacility: (facility: string) => void;
  addStars: (star: string) => void;
  addHotelType: (type: string) => void;
  setMaxPrice: (maxPrice: string) => void;
  clear: () => void;
};

const SearchStore = create<SearchStoreType>((set) => ({
  destination: "",
  checkIn: new Date().toISOString().split("T")[0],
  checkOut: new Date().toISOString().split("T")[0],
  adultCount: 1,
  childCount: 1,
  facilities: [],
  types: [],
  stars: [],
  hotelId: "",
  sortOption: "",
  maxPrice: "",

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
  setSortOption: (sortOption: SortOption) => set({ sortOption }),
  addFacility: (facility: string) =>
    set((state) => ({
      facilities: state.facilities.includes(facility)
        ? state.facilities.filter((f) => f !== facility)
        : [...state.facilities, facility],
    })),
  addStars: (star: string) =>
    set((state) => ({
      stars: state.stars.includes(star)
        ? state.stars.filter((s) => s !== star)
        : [...state.stars, star],
    })),
  addHotelType: (type: string) =>
    set((state) => ({
      types: state.types.includes(type)
        ? state.types.filter((t) => t !== type)
        : [...state.types, type],
    })),
  setMaxPrice: (type: string) => set({ maxPrice: type }),
  clear: () =>
    set({
      destination: "",
      checkIn: new Date().toISOString().split("T")[0],
      checkOut: new Date().toISOString().split("T")[0],
      hotelId: "",
      adultCount: 1,
      childCount: 1,
      facilities: [],
      types: [],
      stars: [],
      sortOption: "",
    }),
}));

export default SearchStore;
