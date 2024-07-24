import ManageHotelForm from "../forms/ManageHotelForm";

const AddHotel = () => {
  return (
    <div className="flex-1 container mx-auto max-w-[55em] px-5 py-20 grid gap-10 sm:px-10 md:py-30 ">
      <h2 className="text-2xl font-bold bg-yellow-200 py-2 px-5 rounded-md w-fit">
        Add Hotel
      </h2>
      <ManageHotelForm />
    </div>
  );
};

export default AddHotel;
