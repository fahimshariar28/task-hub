import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mt-10 py-5 px-2 rounded-3xl shadow-lg shadow-blue-500">
      <h3 className="text-center text-3xl text-blue-500">
        Why Choose Task Hub?
      </h3>
      <div className="md:flex justify-center items-center gap-10 mt-5">
        <div>
          <img src="about.png" alt="" />
        </div>
        <div>
          <p className="text-xl">
            When it comes down to choosing task time management freeware, all
            you need is three things:
          </p>
          <ul className="mt-5 list-disc ml-10 text-xl text-blue-500">
            <li>Free</li>
            <li>Online</li>
            <li>Easy to use</li>
          </ul>
          <p className="mt-5 text-xl">
            Coincidentally, that’s exactly what you get from{" "}
            <span className="text-blue-500">Task Hub</span> - a free task
            management app that’s easy to use.
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
      </div>
    </div>
  );
};

export default About;
