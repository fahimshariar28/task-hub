import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="md:flex justify-center items-center gap-5">
      <div>
        <h3 className="text-6xl">
          <span className="text-blue-500 block">FREE </span>
          Task Management Web APP
        </h3>
        <p className="mt-2 text-xl">
          Organize and manage your team like a boss with Task Hub, a free online
          task time tracking app packing more capabilities.
        </p>
        <div className="mt-5">
          <Link
            to="/teams"
            className="bg-blue-500 text-white px-10 py-3 rounded-full"
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="shadow-2xl">
        <img src="hero.png" alt="" />
      </div>
    </div>
  );
};

export default Hero;
