import React from "react";

type InfoHotelCardProps = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageURLs: string[];
  lastUpdated: Date;
};

const InfoHotelCard = ({
  name,
  imageURLs,
  starRating,
  description,
  pricePerNight,
  facilities,
}: InfoHotelCardProps) => {
  const MAX_FACILITIES = 3;
  const facilitiesToDisplay = facilities.slice(0, MAX_FACILITIES);
  const facilitiesToHide = facilities.slice(MAX_FACILITIES);

  return (
    <div className="flex gap-10">
      <div className="h-[300px] min-w-[300px]">
        <img
          src={imageURLs[0]}
          alt={name}
          className="h-full w-full object-cover rounded-md"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div className="space-y-5">
          <div>
            <div className="space-x-1">
              {Array.from({ length: starRating || 1 }).map((_, index) => (
                <span key={index} className="text-xl text-yellow-500">
                  &#9733;
                </span>
              ))}
            </div>
            <p className="text-2xl font-bold">{name}</p>
          </div>

          <p>{description}</p>
        </div>

        <div className="flex items-center justify-between gap-10">
          <div className="flex flex-wrap items-center gap-4">
            {facilitiesToDisplay.map((facility) => (
              <p
                key={facility}
                className="w-fit bg-gray-300 px-3 py-2 text-[0.72rem]"
              >
                {facility}
              </p>
            ))}
            {facilitiesToHide.length > 0 && (
              <p className="w-fit bg-gray-300 px-3 py-2 text-[0.72rem] font-bold">
                +{facilitiesToHide.length} more
              </p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm">${pricePerNight} per night</p>
            <button className="w-max cursor-pointer rounded-sm bg-blue-700 px-6 py-2 font-semibold text-white">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoHotelCard;
