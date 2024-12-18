import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddAsset from "./component/AddAsset";
import Body from "./component/Body";
import Dashboard from "./component/Dashboard";
import Navbar from "./component/Navbar";
import "./index.css";
import AvailableAssets from "./pages/AvailableAssets";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RegisterPage from "./component/RegisterForm";
import AssetDetailsPage from "./pages/AssetDetailsPage";
import LoginForm from "./pages/LoginForm";
import UserDashboard from "./component/UserDashboard";
import AuditAsset from "./pages/AuditAsset";
import { AssetProvider } from "./context/AssetContext.js";

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (


    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/available-assets" element={<AvailableAssets />} />
        <Route path="/add-asset" element={<AddAsset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Body />} />
        <Route path="/assetDetails/:id" element={<AssetDetailsPage />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/auditAsset" element={<AuditAsset />} />
      </Routes>
    </div>


  );
}

export default App;
