import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import axios from "axios";
import { light } from "@mui/material/styles/createPalette";

const Body = () => {
  const navigate = useNavigate();
  const yourToken = localStorage.getItem("token");
  const [asset, setAsset] = useState([]);

  useEffect(() => {
    if (!yourToken) {
      console.error("No token found. Redirecting to login.");

      navigate("/login");
    }

    axios
      .get("http://localhost:8080/api/assets", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourToken}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data); // Verify the data structure
        setAsset(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assets:", error);
      });
  }, []);

  return (
    <div className="m-2 p-4">
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-4 px-8 rounded-lg shadow-lg mb-6 flex items-center justify-between">
        <div className="text-xl font-semibold">⚠️ Use Assets Carefully!</div>
        <div className="text-sm">
          Please ensure the proper use of all available assets. Follow the
          guidelines.
        </div>
        <button className="bg-yellow-500 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-400 transition duration-300">
          Learn More
        </button>
      </div>

      <div className="font-semibold text-3xl mb-6 text-center">
        Welcome to the Asset Management Page!
      </div>

      <div className="flex flex-wrap gap-4">
        {asset.map((asset) => (
          <Card key={asset.assetId} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default Body;
