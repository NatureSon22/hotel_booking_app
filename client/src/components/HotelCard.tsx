import { useNavigate } from "react-router-dom";
import { HotelType } from "../../../server/src/models/hotel";
import HotelStore from "../context/hotelStore";

const HotelCard = ({
  name,
  country,
  city,
  description,
  adultCount,
  childCount,
  pricePerNight,
  starRating,
  type,
  _id,
}: HotelType) => {
  const setHotel = HotelStore((state) => state.setHotel);
  const navigate = useNavigate();

  const handleClick = () => {
    setHotel({
      name,
      country,
      city,
      description,
      adultCount,
      childCount,
      pricePerNight,
      starRating,
      type,
      _id,
    });
    navigate(`/hotel/${_id}`);
  };

  return (
    <div className="cursor-pointer space-y-4 rounded-md border px-6 py-7 shadow-lg sm:p-10 card-style relative" onClick={handleClick} >
      <p className="font-semibold">{name || "Test"}</p>
      <p>{_id}</p>
      <p>
        {description}
      </p>

      <div className="ml-5 space-y-3 text-gray-600 pt-2">
        <div className="flex items-center gap-3">
          <span>&#9873;</span>
          <span>
            {city}, {country}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>&#9751;</span>
          <span>{type}</span>
        </div>

        <div className="flex items-center gap-3">
          <span> &#36;</span>
          <span>{pricePerNight}</span>
        </div>

        <div className="flex items-center gap-3">
          <span> &#9679;</span>
          <span>
            {adultCount} {adultCount > 1 ? "adults" : "adult"}, {childCount}{" "}
            {childCount > 1 ? "children" : "child"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>&#x2606;</span>
          <span>{starRating} star rating</span>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
