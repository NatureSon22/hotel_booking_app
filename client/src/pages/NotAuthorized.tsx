import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="flex-1 grid place-items-center font-open">
      <div className="text-center grid gap-4">
        <h2 className="font-semibold text-2xl sm:text-3xl ">
          Oops! You're not logged in
        </h2>
        <p className="text-gray-600">Please log in to view this page.</p>
        <Link
          to="/sign-in"
          className="border mt-5 w-fit mx-auto py-3 text-white px-10 rounded-full font-bold tracking-widest uppercase bg-blue-950"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default NotAuthorized;
