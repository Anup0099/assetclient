import React from "react";
import Card from "./Card";

const Body = () => {
  const asset = [
    {
      name: "Dell Laptop",
      category: "Electronics",
      description: "A high-performance laptop for work and gaming.",
      status: "Available",
    },
    {
      name: "Apple iPhone",
      category: "Electronics",
      description: "The latest iPhone with a stunning display.",
      status: "Unavailable",
    },
    {
      name: "Samsung TV",
      category: "Electronics",
      description: "A 4K TV with a crystal-clear display.",
      status: "Available",
    },
    {
      name: "Canon Camera",
      category: "Electronics",
      description: "A professional camera for capturing memories.",
      status: "Available",
    },
    {
      name: "Amazon Echo",
      category: "Electronics",
      description: "A smart speaker that simplifies your life.",
      status: "Unavailable",
    },
    {
      name: "Sony Headphones",
      category: "Electronics",
      description: "Wireless headphones with noise-cancellation.",
      status: "Available",
    },
  ];

  return (
    <div className="m-2 p-4">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-4 px-8 rounded-lg shadow-lg mb-6 flex items-center justify-between">
        <div className="text-xl font-semibold">
          ⚠️ Use Assets Carefully and Consciously!
        </div>
        <div className="text-sm">
          Please ensure the proper use of all available assets. Take
          responsibility and follow the guidelines.
        </div>
        <button className="bg-yellow-500 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-400 transition duration-300">
          Learn More
        </button>
      </div>

      {/* Welcome Message */}
      <div className="font-semibold text-3xl mb-6 text-center">
        Welcome to the Asset Management Page, Anup!
      </div>

      {/* Asset Cards */}
      <div className="flex flex-wrap gap-4">
        {asset.map((asset, index) => {
          return <Card key={index} asset={asset} />;
        })}
      </div>
    </div>
  );
};

export default Body;
