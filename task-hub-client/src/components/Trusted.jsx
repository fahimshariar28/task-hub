import { Link } from "react-router-dom";

const Trusted = () => {
  return (
    <div className="mt-10">
      <h3 className="text-6xl text-center">
        Trusted by over <span className="text-blue-500">12,000,000</span> teams
        worldwide
      </h3>
      <div className="mt-5 flex justify-center">
        <Link
          to="/teams"
          className="bg-blue-500 text-white px-10 py-3 rounded-full"
        >
          Get Started
        </Link>
      </div>
      <div className="mt-5 flex justify-center">
        <img className="w-fit" src="trusted.png" alt="" />
      </div>
    </div>
  );
};

export default Trusted;
