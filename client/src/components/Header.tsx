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
    <div className="bg-blue-800 px-6 py-8 font-open">
      <div className="container mx-auto flex max-w-[65em] items-center justify-between">
        <p className="decor relative cursor-pointer font-fair text-[1.2rem] font-extrabold text-white md:text-[1.4rem]">
          <Link to="/">Booking</Link>
        </p>

        <div>
          <ul className="flex items-center gap-3 text-[0.9rem] text-white sm:gap-12 md:text-[1rem]">
            {isAuthorized && (
              <>
                <Link
                  to="/"
                  className="link-design relative hover:before:w-full"
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
                className="apply-transition rounded-sm border border-white/60 px-4 py-2 hover:bg-white hover:text-blue-800"
                onClick={signOut}
              >
                Sign out
              </button>
            ) : (
              <Link
                className="apply-transition rounded-sm border border-white/60 px-4 py-2 hover:bg-white hover:text-blue-800"
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
