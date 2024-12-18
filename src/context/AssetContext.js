import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AssetContext = createContext();

const AssetProvider = ({ children }) => {
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [assets, setAssets] = useState([]); // State to store assets
  const [loading, setLoading] = useState(false); // State for loading
  const [error, setError] = useState(null); // State for error
  const [token, setToken] = useState(localStorage.getItem("token")); // Store token in state

  // Function to fetch all assets
  const fetchAssets = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await axios.get("http://localhost:8080/api/assets", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token for authorization
        },
        withCredentials: true, // Include credentials if necessary
      });
      console.log("Fetched assets:", response.data); // Log the response
      setAssets(response.data); // Update state with the fetched assets
    } catch (err) {
      console.error("Error fetching assets:", err);
      setError("Failed to fetch assets. Please try again later.");
    } finally {
      setLoading(false); // Set loading back to false
    }
  };

  // Function to add a new asset
  const addAsset = async (formDataToSend) => {
    try {
      const response = await axios.post("http://localhost:8080/api/assets", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setAssets((prevAssets) => [...prevAssets, response.data]); // Update state with the new asset
      navigate("/list-assets"); // Navigate after success
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  // Fetch assets on initial load if token exists
  useEffect(() => {
    if (token) {
      fetchAssets();
    } else {
      navigate("/"); // Redirect to register if no token exists
    }
  }, [token]);

  // Provide context values to consuming components
  return (
    <AssetContext.Provider value={{ assets, fetchAssets, addAsset, loading, error, token, setToken }}>
      {children}
    </AssetContext.Provider>
  );
};

// Custom hook to use the AssetContext
export const useAsset = () => useContext(AssetContext);

export { AssetProvider, AssetContext };
