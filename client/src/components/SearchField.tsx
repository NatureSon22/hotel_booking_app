import React from "react";
import useSearch from "../hooks/search";
import { useNavigate } from "react-router-dom";

const SearchField = () => {
  const {
    destination,
    setDestination,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    adultCount,
    setAdultCount,
    childCount,
    setChildCount,
    saveSearchValues,
    clear,
  } = useSearch();
  const navigate = useNavigate();

  return (
    <div className="absolute -bottom-28 left-[50%] max-w-[70em] -translate-x-[50%]">
      <div className="flex w-[90%] flex-col items-center gap-5 rounded-md bg-amber-500 px-8 py-5 shadow-md xsm:max-w-[30em] sm:w-full sm:max-w-max sm:flex-row">
        <div className="flex w-full items-center gap-3 rounded-sm bg-white p-2 px-4">
          <span className="font-bold">&#x2609;</span>
          <input
            type="text"
            placeholder="Where are you going?"
            className="outline-none"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="w-full space-y-2 sm:flex sm:min-w-[20em] sm:items-center sm:gap-2 sm:space-y-0">
          <div className="flex flex-1 items-center gap-3 rounded-sm bg-white p-2 px-4">
            <span>Adults: </span>
            <input
              type="number"
              className="w-full"
              value={adultCount}
              onChange={(e) => setAdultCount(e.target.valueAsNumber)}
            />
          </div>

          <div className="flex flex-1 items-center gap-3 rounded-sm bg-white p-2 px-4">
            <span>Children: </span>
            <input
              type="number"
              className="w-full"
              value={childCount}
              onChange={(e) => setChildCount(e.target.valueAsNumber)}
            />
          </div>
        </div>

        <div className="flex w-full justify-center gap-2">
          <input
            type="date"
            className="p-2"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <input
            type="date"
            className="p-2"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <div className="flex gap-2 sm:flex-col">
          <button
            className="rounded-md bg-red-700 px-7 py-2 text-white"
            onClick={() => {
              saveSearchValues();
              navigate("/search");
            }}
          >
            Search
          </button>
          <button
            className="rounded-md bg-blue-700 px-7 py-2 text-white"
            onClick={clear}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchField;
