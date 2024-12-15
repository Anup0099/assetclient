import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AssetDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);
  const [asset, setAsset] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("Asset ID not found. Redirecting to home page.");
      navigate("/home");
      return;
    }
    axios
      .get(`http://localhost:8080/api/assets/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setAsset(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching asset details:", error);
        setError("Failed to load asset details. Please try again later.");
      });
  }, [id, navigate]);

  if (!asset && !error) {
    return <p className="text-center">Loading asset details...</p>;
  }

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="max-w-lg w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="w-full ">
            <img
              src={asset.imageUrl || "https://via.placeholder.com/150"}
              alt={asset.name}
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="p-6 flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {asset.name}
            </h1>
            <p className="text-gray-600 mb-4">{asset.description}</p>
            <p className="text-sm text-gray-500 mb-4">Status: {asset.status}</p>
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
      )}
    </div>
  );
};

export default AssetDetailsPage;
