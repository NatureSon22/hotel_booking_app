import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../service/api-client";
import ToastStore from "../context/toastStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthorizedStore from "../context/authorizedStore";

export type SignInFormType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const state = useLocation().state;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormType>();
  const showToast = ToastStore((state) => state.showToast);
  const setIsAuthorized = AuthorizedStore((state) => state.setIsAuthorized);
  const navigate = useNavigate();
  const mutation = useMutation(apiClient.login, {
    onSuccess: (data) => {
      showToast(data.message, "SUCCESS");
      setIsAuthorized(true);
      state?.from?.pathname ? navigate(state.from.pathname) : navigate("/");
    },
    onError: (error: Error) => {
      showToast(error.message, "ERROR");
      console.log(error);
    },
  });

  const onSubmit = (data: SignInFormType) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex-1">
      <form
        className="container mx-auto grid max-w-[55em] gap-7 px-5 py-10 sm:px-10 md:py-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold">Login to your account</h2>

        <div className="grid gap-4">
          <label className="flex flex-1 flex-col gap-2">
            <span className="text-sm font-semibold">Email</span>
            <input
              {...register("email", {
                required: "This field is required",
              })}
              type="text"
              className="rounded-sm border border-gray-300 px-4 py-3"
            />
            <div
              className={`ml-auto text-[0.75rem] text-red-600 ${
                errors.email?.message ? "visible" : "invisible"
              }`}
            >
              {errors.email?.message || "error"}
            </div>
          </label>

          <label className="flex flex-1 flex-col gap-2">
            <span className="text-sm font-semibold">Password</span>
            <input
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              className="rounded-sm border border-gray-300 px-4 py-3"
            />
            <div
              className={`ml-auto text-[0.75rem] text-red-600 ${
                errors.password?.message ? "visible" : "invisible"
              }`}
            >
              {errors.password?.message || "error"}
            </div>
          </label>

          <div className="text-[0.85rem]">
            Don't have an account?
            <Link to="/register" className="ml-1 font-bold">
              Register
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="apply-transition mx-auto mt-3 rounded-sm bg-blue-800 px-7 py-3 font-bold text-white hover:bg-yellow-400 sm:mr-0"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
