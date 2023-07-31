import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginData } from "../types/types";
import { useAppDispatch } from "../store/hooks";
import { authActions } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { loginMutation } from "../api/api";
import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    handleSubmit,
    register,
    // formState: { errors },
  } = useForm<ILoginData>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: loginMutation,
    onSuccess: (data) => {
      const accessToken: string = data.accessToken;
      dispatch(authActions.login({ accessToken }));
      localStorage.setItem("authToken", accessToken);
      navigate("/");
      toast.success("Login successful", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
      });
    },
    onError: () => {
      toast.error("Login failed", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
      });
    },
  });

  const onSubmit: SubmitHandler<ILoginData> = async (data) => {
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
        <div className=" flex flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-bold">Sign In</h1>
          <p className="text-xs font-semibold text-gray-400">
            Sign in with your email
          </p>
          <div className="flex flex-col gap-3 w-full">
            <input
              type="text"
              placeholder="Email"
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
              {...register("email", { required: "Email is required" })}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400"
              {...register("password", { required: "Password is required" })}
            />
          </div>
          <div className="flex flex-col w-full pt-2">
            <button
              className="bg-blue-400 text-white rounded-lg px-3 py-2"
              type="submit"
            >
              Sign In
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
            Don't have an account?
            <span className="text-blue-400 cursor-pointer px-1">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Login;
