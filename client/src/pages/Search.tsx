import { useQuery } from "react-query";
import SearchStore from "../context/searchStore";
import * as apiClient from "../service/api-client";
import { useState } from "react";
import Spinner from "../components/Spinner";
import InfoHotelCard from "../components/InfoHotelCard";
import Pagination from "../components/Pagination";

const Search = () => {
  const [page, setPage] = useState<number>(1);
  const search = SearchStore((state) => state);
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    adultCount: search.adultCount?.toString(),
    childCount: search.childCount?.toString(),
    page: page.toString(),
  };

  const { data, isLoading } = useQuery(
    ["fetchHotels", searchParams],  // Use searchParams as part of the query key
    () => apiClient.searchHotels(searchParams),
    {
      keepPreviousData: true,  // Keeps the previous data while fetching the new data
    }
  );

  if (isLoading) {
    return (
      <div className="grid flex-1 place-items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid flex-1 justify-items-center pb-20">
      <div className="mt-44 flex w-full max-w-[70em] gap-10">
        <div className="sticky h-40 w-72 bg-yellow-200 top-4"></div>

        <div className="grid flex-1 space-y-10">
          <div className="text-xl font-bold">{`${data.pagination.total} ${data.pagination.total > 1 ? "Hotels" : "Hotel"} found`}</div>

          <div className="space-y-14">
            {data.data?.map((hotel) => (
              <InfoHotelCard key={hotel._id} {...hotel} />
            ))}
          </div>

          <Pagination
            page={page}
            pages={data.pagination.pages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;