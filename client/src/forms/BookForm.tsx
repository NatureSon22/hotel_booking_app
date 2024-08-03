import { useForm, SubmitHandler } from "react-hook-form";
import AuthorizedStore from "../context/authorizedStore";
import useSearch from "../hooks/search";
import { useNavigate, useLocation } from "react-router-dom";

type BookFormProps = {
  pricePerNight: number;
  hotelId: string;
  destination: string;
};

type GuestInfoFormData = {
  checkIn: string;
  checkOut: string;
  adultCount: number;
  childCount: number;
};

const BookForm = ({ pricePerNight, hotelId, destination }: BookFormProps) => {
  const isAuthorized = AuthorizedStore((state) => state.isAuthorized);
  const { checkIn, checkOut, adultCount, childCount, saveSearchValues } =
    useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn,
      checkOut,
      adultCount,
      childCount,
    },
  });

  const onSubmit: SubmitHandler<GuestInfoFormData> = (data) => {
    saveSearchValues(
      destination,
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
      hotelId,
    );

    if (isAuthorized) {
      //
    } else {
      navigate("/sign-in", { state: { from: location } });
    }
  };

  return (
    <form
      className="card-style relative grid max-w-[25em] gap-5 rounded-md px-7 py-10 shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="font-bold">${pricePerNight} per night</p>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="checkIn">Check in</label>
          <input
            {...register("checkIn", { required: "Check-in date is required" })}
            type="date"
            id="checkIn"
            className="border"
          />
          {errors.checkIn && (
            <p className="text-red-500">{errors.checkIn.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="checkOut">Check out</label>
          <input
            {...register("checkOut", {
              required: "Check-out date is required",
            })}
            type="date"
            id="checkOut"
            className="border"
          />
          {errors.checkOut && (
            <p className="text-red-500">{errors.checkOut.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <label htmlFor="adultCount">Adults</label>
              <input
                min={1}
                {...register("adultCount", {
                  valueAsNumber: true,
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "At least 1 adult is required",
                  },
                })}
                type="number"
                id="adultCount"
                className="max-w-20 border"
              />
            </div>

            {errors.adultCount && (
              <p className="ml-auto text-[0.7rem] text-red-500">
                {errors.adultCount.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="childCount">Children</label>
            <input
              {...register("childCount", {
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Cannot be negative",
                },
              })}
              min={0}
              type="number"
              id="childCount"
              className="max-w-20 border"
            />
            {errors.childCount && (
              <p className="text-red-500">{errors.childCount.message}</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 w-full rounded-md bg-blue-500 py-3 font-bold text-white"
      >
        {isAuthorized ? "Book now" : "Sign in to book"}
      </button>
    </form>
  );
};

export default BookForm;
