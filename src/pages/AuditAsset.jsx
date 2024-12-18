import axios from "axios";
import React, { useState, useEffect } from "react";

const AuditAsset = () => {
//   const token = localStorage.getItem("token");
  const [assets, setAssets] = useState([]);

  // Mock API Call: Replace with real API request
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/assets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setAssets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  //   const fetchAssets = () => {
  //     // Example asset data (Replace with real API data)
  //     const mockAssets = [
  //       { id: 1, name: "Laptop", category: "Electronics", owner: "John Doe" },
  //       { id: 2, name: "Office Chair", category: "Furniture", owner: "Jane Doe" },
  //       { id: 3, name: "Printer", category: "Electronics", owner: "David Smith" },
  //     ];
  //     setAssets(mockAssets);
  //   };

  const handleDelete = (id) => {
    // Replace with real delete logic
    axios
      .delete(`http://localhost:8080/api/assets/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Deleted asset with ID: ", id);
        const updatedAssets = assets.filter((asset) => asset.assetId !== id);
        setAssets(updatedAssets);
      })
      .catch((error) => {
        console.error("Error deleting asset: ", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Audit Assets</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Asset Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Description
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {assets.length > 0 ? (
              assets.map((asset) => (
                <tr key={asset.assetId} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {asset.assetId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {asset.assetName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {asset.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {asset.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {asset.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(asset.assetId)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No assets available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditAsset;
