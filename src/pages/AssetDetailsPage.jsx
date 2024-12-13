import React from "react";
import { useNavigate } from "react-router-dom";
const AssetDetailsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <div className="max-w-lg bg-white rounded-lg shadow-md overflow-hidden">
        {/* Image Section */}
        <div className="w-full">
          <img
            src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?cs=srgb&dl=pexels-andre-furtado-1264210.jpg&fm=jpg"
            alt="Camera"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="p-6 flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Asset Name</h1>
          <p className="text-gray-600 mb-4">
            This is a detailed description of the asset. It provides information
            about its features, condition, and usability.
          </p>
          <p className="text-sm text-gray-500 mb-4">Status: Available</p>
          <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300">
            Request
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
            onClick={() => {
              navigate("/home");
            }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsPage;
