import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../service/api-client";
import ToastStore from "../context/toastStore";
import { Link, useNavigate } from "react-router-dom";
import AuthorizedStore from "../context/authorizedStore";

export type SignInFormType = {
  email: string;
  password: string;
};

const SignIn = () => {
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
      navigate("/");
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
        className="container mx-auto max-w-[55em] px-5 py-10 grid gap-7 sm:px-10 md:py-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold">Login to your account</h2>

        <div className="grid gap-4">
          <label className="flex flex-col gap-2 flex-1" >
            <span className="text-sm font-semibold">Email</span>
            <input
              {...register("email", {
                required: "This field is required",
              })}
              type="text"
              className="border py-3 px-4 rounded-sm border-gray-300"
            />
            <div
              className={`text-[0.75rem] ml-auto text-red-600 ${
                errors.email?.message ? "visible" : "invisible"
              }`}
            >
              {errors.email?.message || "error"}
            </div>
          </label>

          <label className="flex flex-col gap-2 flex-1">
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
              className="border py-3 px-4 rounded-sm border-gray-300"
            />
            <div
              className={`text-[0.75rem] ml-auto text-red-600 ${
                errors.password?.message ? "visible" : "invisible"
              }`}
            >
              {errors.password?.message || "error"}
            </div>
          </label>

          <div className="text-[0.85rem]">
            Don't have an account?
            <Link to="/register" className="font-bold ml-1">
              Register
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="mt-3 mx-auto sm:mr-0 bg-blue-800 text-white px-7 py-3 font-bold rounded-sm apply-transition hover:bg-yellow-400"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
