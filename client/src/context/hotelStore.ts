import { create } from "zustand";
import { HotelType } from "../../../server/src/models/hotel";

type HotelStoreType = {
  hotel: HotelType;
  setHotel: (hotel: HotelType) => void;
  clear: () => void;
};

const HotelStore = create<HotelStoreType>((set) => ({
  hotel: {} as HotelType,
  setHotel: (hotel) => set({ hotel }),
  clear: () => set({ hotel: {} as HotelType }),
}));

export default HotelStore;
