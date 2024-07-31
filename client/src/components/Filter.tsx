import React from "react";
import { hotelFacilities, hotelTypes } from "../config/hotel-options-config";
import SearchStore from "../context/searchStore";

const Filter = () => {
  const { addStars, addFacility, addHotelType, setMaxPrice } = SearchStore(
    (state) => state,
  );

  const handleAddStars = (star: string) => {
    addStars(star);
  };

  return (
    <div className="space-y-7 bg-white">
      <p className="text-lg font-semibold">Filter by:</p>

      <div className="space-y-7">
        <div className="space-y-3">
          <p className="font-medium">Property Rating</p>
          <div className="space-y-2">
            {Array.from({ length: 5 }, (_, i) => {
              return (
                <div key={i} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    onChange={() => handleAddStars((5 - i).toString())}
                  />
                  <div>{5 - i} Stars</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium">Hotel Type</p>
          <div className="flex flex-wrap items-center gap-3">
            {hotelTypes.map((hotel) => {
              return (
                <div key={hotel} className="flex items-center gap-3">
                  <input type="checkbox" onChange={() => addHotelType(hotel)} />
                  <div>{hotel}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium">Facilities</p>
          <div className="flex flex-wrap items-center gap-3">
            {hotelFacilities.map((facility) => {
              return (
                <div key={facility} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    onChange={() => addFacility(facility)}
                  />
                  <div>{facility}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-medium">Price</p>
          <select onChange={(e) => setMaxPrice(e.target.value)}>
            {[50, 100, 500, 1000, 5000].map((price) => {
              return <option key={price}>{price}</option>;
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
