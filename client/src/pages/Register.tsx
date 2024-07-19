import { useForm } from "react-hook-form";

type RegisterFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <div className="flex-1">
      <form
        className="container mx-auto max-w-[55em] px-5 py-10 grid gap-7 sm:px-10 md:py-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold">Create an Account</h2>

        <div className="grid gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <label className="flex flex-col gap-2 flex-1">
              <span className="text-sm font-semibold">First Name</span>
              <input
                {...register("firstName", {
                  required: "This field is required",
                })}
                type="text"
                className="border py-3 px-4 rounded-sm border-gray-300"
              />
              <div
                className={`text-[0.75rem] ml-auto text-red-600 ${
                  errors.firstName?.message ? "visible" : "invisible"
                }`}
              >
                {errors.firstName?.message || "error"}
              </div>
            </label>

            <label className="flex flex-col gap-2 flex-1">
              <span className="text-sm font-semibold">Last Name</span>
              <input
                {...register("lastName", {
                  required: "This field is required",
                })}
                type="text"
                className="border py-3 px-4 rounded-sm border-gray-300"
              />
              <div
                className={`text-[0.75rem] ml-auto text-red-600 ${
                  errors.lastName?.message ? "visible" : "invisible"
                }`}
              >
                {errors.lastName?.message || "error"}
              </div>
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Email</span>
            <input
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
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

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Password</span>
            <input
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
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

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Confirm Password</span>
            <input
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues("password") ||
                  "The passwords do not match",
              })}
              type="password"
              className="border py-3 px-4 rounded-sm border-gray-300"
            />
            <div
              className={`text-[0.75rem] ml-auto text-red-600 ${
                errors.confirmPassword?.message ? "visible" : "invisible"
              }`}
            >
              {errors.confirmPassword?.message || "error"}
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="mt-3 mx-auto sm:mr-0 bg-blue-800 text-white px-7 py-3 font-bold rounded-sm apply-transition hover:bg-yellow-400"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
