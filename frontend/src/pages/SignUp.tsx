import { SubmitHandler, useForm } from "react-hook-form";
import { IRegisterData } from "../types/types"; // Assuming you have a type for the registration data
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { registerMutation } from "../api/api";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<IRegisterData>();

  const navigate = useNavigate();

  const { mutateAsync } = useMutation<IRegisterData, Error, IRegisterData>(
    registerMutation,
    {
      onSuccess: (data) => {
        console.log(data);
        navigate("/login");
        toast.success("Registration successful", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: true,
        });
      },
      onError: (error) => {
        const errorMessage = error as unknown as string;

        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          hideProgressBar: true,
        });
      },
    }
  );

  const onSubmit: SubmitHandler<IRegisterData> = async (data) => {
    try {
      await mutateAsync(data);
    } catch {
      console.log("error");
    }
  };

  return (
    <form
      className="flex justify-center items-center h-screen bg-[#F6F9FB]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-white w-96 rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-bold">Sign Up</h1>
          <p className="text-xs font-semibold text-gray-400">
            Create an account
          </p>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold text-gray-400">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="border text-sm border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
              {...register("username", { required: "Name is required" })}
            />
            {
              <p className="text-red-500 text-xs">
                {errors?.username?.message}
              </p>
            }
            <label className="text-xs font-semibold text-gray-400">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="border text-sm border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 "
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {<p className="text-red-500 text-xs">{errors?.email?.message}</p>}
            <label className="text-xs font-semibold text-gray-400">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border text-sm border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
              {...register("password", { required: "Password is required" })}
            />
            {
              <p className="text-red-500 text-xs">
                {errors?.password?.message}
              </p>
            }
            <label className="text-xs font-semibold text-gray-400">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="border text-sm border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
              {...register("confirmPassword", {
                required: "Password is required",
                validate: (value) =>
                  value === watch("password") || "The passwords do not match",
              })}
            />
            {
              <p className="text-red-500 text-xs">
                {errors?.confirmPassword?.message}
              </p>
            }
          </div>
          <div className="flex flex-col w-full pt-2">
            <button
              className="bg-blue-400 text-white rounded-lg px-3 py-2"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 flex-grow"></div>
              <div className="px-2 text-sm text-gray-400 font-semibold">or</div>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>
          </div>

          <p className="text-xs font-semibold text-gray-400">
            Already have an account?
            <span className="text-blue-400 cursor-pointer px-1">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Signup;
