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
    <BrowserRouter >

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
        </Routes>


      </div >
    </BrowserRouter>
  );
}

export default App;
