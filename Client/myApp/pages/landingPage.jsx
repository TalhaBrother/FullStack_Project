import Navbar from "../components/Navbar.jsx";
import useAuth from "../context/auth.js";

const LandingPage = () => {
  let auth = useAuth((state) => state.user);
  console.log("AuthUserInLandingPage:", auth);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
          Welcome to my Project
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl mb-8 max-w-2xl">
          Your one-stop solution for modern web templates. Build beautiful UIs quickly and easily.
        </p>

        {/* CTA Buttons */}
        <div className="flex space-x-4">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
            Get Started
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
            Learn More
          </button>
        </div>

        {/* Illustration Placeholder */}
        <div className="mt-12 w-full max-w-4xl">
          <img
            src="https://via.placeholder.com/800x400?text=Your+Illustration+Here"
            alt="Landing Illustration"
            className="w-full rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
