import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import SocialLogin from "../Shared/SocialLogin";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import signup from "../../assets/signup.json";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setError(null);
    reset();
    const name = data.name;
    const email = data.email;
    const photo = data.photo;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    if (password === confirmPassword) {
      createUser(email, password)
        .then((result) => {
          console.log(result);
          updateUserProfile(name, photo).then(() => {
            const savedUser = { name, email, photo };
            fetch("https://task-hub-server-self.vercel.app/users", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(savedUser),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                navigate("/");
                toast.success("Account Created Successfully");
              });
          });
        })
        .catch((error) => {
          console.log(error.message);
          toast.error(error.message);
        });
    } else {
      setError("Password and Confirm Password must be same");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Register | Task Hub</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row justify-evenly">
        <div className="w-1/2 lg:pr-20">
          <Lottie animationData={signup} loop={true} />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Name <span className="text-error">*</span>
                </span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
              />
            </div>
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
                <span className="label-text">Image URL</span>
              </label>
              <input
                {...register("photo")}
                type="text"
                placeholder="Your Image URL"
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
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                type="password"
                placeholder="********"
                className="input input-bordered"
              />
              <label className="label">
                {errors.exampleRequired && <span>This field is required</span>}
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Confirm Password <span className="text-error">*</span>
                </span>
              </label>
              <input
                {...register("confirmPassword", { required: true })}
                type="password"
                placeholder="********"
                className="input input-bordered"
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 20 characters
                  </p>
                )}
                {error && (
                  <p className="text-red-600">Password Does not match</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one lower case, one number
                    and one special character.
                  </p>
                )}
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <p className="p-5 text-center">
            Already Have an Account?{" "}
            <span className="text-primary">
              <Link to="/login">Login</Link>
            </span>{" "}
          </p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
