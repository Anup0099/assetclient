import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { email, password };

    // Sending login credentials to the backend
    axios
      .post("http://localhost:8080/api/auth/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          // Save the token in the local storage
          console.log("User logged in successfully", response.data);

          // Log the token to the console
         

          // Save the token to localStorage
          localStorage.setItem("token", response.data);

          // Redirect to the home page
          navigate("/home");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log("Error logging in:", error);
          setErrorMessage("Invalid email or password");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      });

    // Clear the input fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-1/2 h-full "
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700">Login</h2>
        {errorMessage && (
          <div className="text-red-600 mb-4">{errorMessage}</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
