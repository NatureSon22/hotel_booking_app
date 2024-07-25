import { Link, useNavigate } from "react-router-dom";
import AuthorizedStore from "../context/authorizedStore";
import * as apiClient from "../service/api-client";
import { useMutation } from "react-query";
import ToastStore from "../context/toastStore";

const Header = () => {
  const { isAuthorized, setIsAuthorized } = AuthorizedStore((state) => state);
  const showToast = ToastStore((state) => state.showToast);
  const navigate = useNavigate();
  const mutation = useMutation(apiClient.signOut, {
    retry: 0,
    onSuccess: (data) => {
      showToast(data.message, "SUCCESS");
      setIsAuthorized(false);
      navigate("/");
    },
  });

  const signOut = () => {
    mutation.mutate();
  };

  return (
    <div className="bg-blue-800 py-8 px-6 font-open">
      <div className="container mx-auto flex justify-between items-center max-w-[65em]">
        <p className="text-[1.2rem] md:text-[1.4rem] font-extrabold text-white font-fair cursor-pointer relative decor">
          <Link to="/">Booking</Link>
        </p>

        <div>
          <ul className="flex gap-3 items-center text-white text-[0.9rem] md:text-[1rem] sm:gap-12">
            {isAuthorized && (
              <>
                <Link
                  to="/add-hotels"
                  className="link-design relative hover:before:w-full "
                >
                  My Bookings
                </Link>
                <Link
                  to="/my-hotels"
                  className="link-design relative hover:before:w-full"
                >
                  My Hotels
                </Link>
              </>
            )}
            {isAuthorized ? (
              <button
                className="border border-white/60 px-4 rounded-sm py-2 hover:bg-white hover:text-blue-800 apply-transition"
                onClick={signOut}
              >
                Sign out
              </button>
            ) : (
              <Link
                className="border border-white/60 px-4 rounded-sm py-2 hover:bg-white hover:text-blue-800 apply-transition"
                to="/sign-in"
              >
                Sign in
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
