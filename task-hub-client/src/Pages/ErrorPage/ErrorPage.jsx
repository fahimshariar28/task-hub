import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-6">
        {
          "The page you are looking for might have been removed had its name changed or is temporarily unavailable."
        }
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
