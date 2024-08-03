import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../service/api-client";
import { HotelType } from "../../../server/src/models/hotel";
import BookForm from "../forms/BookForm";

const DetailsPage = () => {
  // {
  //   _id: '66a77cab9277ce6443302c66',
  //   userId: '66a77b719277ce6443302c4d',
  //   city: 'Cebu',
  //   name: 'Ocean Breeze Resort',
  //   country: 'Philippines',
  //   description:
  //     'A beachfront resort offering stunning ocean views, luxurious amenities, and exceptional service. Perfect for a relaxing getaway.',
  //   type: 'Budget',
  //   adultCount: 100,
  //   childCount: 50,
  //   facilities: [ 'Free WiFi', 'Parking', 'Airport Shuttle' ],
  //   pricePerNight: 150,
  //   starRating: 4,
  //   imageURLs: [

  //       'http://res.cloudinary.com/dqprouhuj/image/upload/v1722252459/ps9exi48ema90z0unwpp.jpg',
  //       'http://res.cloudinary.com/dqprouhuj/image/upload/v1722252455/dvwbswsv9blnm7gu25l2.jpg'
  //   ],
  //   lastUpdated: '2024-07-29T11:27:39.607Z',
  //   __v: 0
  // }

  const { id } = useParams();
  const { data: hotelData } = useQuery<HotelType>(["fetchHotelById", id], () =>
    apiClient.viewHotel(id),
  );

  return (
    <div className="grid flex-1">
      <div className="mx-auto w-full max-w-[68em] space-y-16 px-5 pb-32 pt-20">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {Array.from({ length: hotelData?.starRating || 0 }, (_, i) => (
              <div key={i}> ⭐️ </div>
            ))}
          </div>
          <p className="text-2xl font-bold">{hotelData?.name}</p>
        </div>

        <div className="space-y-8">
          <div className="flex flex-wrap gap-5">
            {hotelData?.imageURLs.map((image) => (
              <img
                key={image}
                src={image}
                alt={hotelData?.name}
                className="max-h-[18em] min-w-[20em] flex-1 rounded-md object-cover"
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {hotelData?.facilities.map((facility) => (
              <div
                key={facility}
                className="inline-block rounded-full bg-gray-200 px-6 py-2 text-sm font-semibold text-gray-700"
              >
                {facility}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-10">
          <div className="space-y-5 text-gray-700 text-justify leading-[1.9em]">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              repellendus voluptates voluptatibus minima error voluptas atque,
              dicta consequuntur nobis vel velit ullam libero quaerat officiis
              rem fugit consequatur exercitationem aspernatur! Ratione fugit
              cumque quam aperiam. Necessitatibus blanditiis distinctio maxime
              ea facilis minus nam neque nisi, nesciunt, officia obcaecati porro
              ad modi voluptate expedita culpa quod velit dolorum iste quidem.
              Placeat?
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
              itaque iusto voluptates fugiat earum amet explicabo eos, corrupti
              quasi tempore est ullam, ipsum dolores deserunt harum voluptatum
              repellat voluptas odit. Quisquam repellat repudiandae vel libero
              impedit fugiat, error doloremque dolore illo eaque dolor voluptate
              exercitationem est deleniti veniam voluptas magnam, accusamus eum
              dolorem ut totam culpa! Asperiores obcaecati maiores alias? Quis
              at deserunt exercitationem deleniti eaque, nesciunt tenetur error
              ipsum corporis in sunt consectetur pariatur provident fugit id
              obcaecati, delectus officiis earum voluptatem repellendus sint.
              Sunt excepturi assumenda cum quis! Pariatur numquam asperiores
              suscipit, blanditiis laboriosam nihil omnis ea maiores, culpa vel
              quibusdam provident nulla, delectus vero a exercitationem ad
              dolores adipisci. Minima, saepe? Ducimus aliquam magnam excepturi?
              Facere, quasi!
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At
              dignissimos atque totam doloribus ab voluptate incidunt, delectus
              sit amet neque exercitationem aliquam pariatur porro natus fuga!
              Consectetur voluptas excepturi earum.
            </p>
          </div>

          <div>
            <BookForm {...hotelData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
