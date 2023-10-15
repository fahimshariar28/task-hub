import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import login from "../../assets/login.json";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    reset();
    const email = data.email;
    const password = data.password;
    loginUser(email, password)
      .then((result) => {
        console.log(result);
        navigate(from, { replace: true });
        toast.success("Successfully Logged in!");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Login | Task Hub</title>
      </Helmet>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row justify-evenly">
          <div className="w-1/2 lg:pr-20">
            <Lottie animationData={login} loop={true} />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Email <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Your email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Password <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="********"
                  className="input input-bordered"
                />
                <label className="label">
                  {errors.exampleRequired && (
                    <span>This field is required</span>
                  )}
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary w-full"
                />
              </div>
            </form>
            <p className="p-5 text-center">
              New Here?{" "}
              <span className="text-primary">
                <Link to="/register">Create an account</Link>
              </span>{" "}
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
