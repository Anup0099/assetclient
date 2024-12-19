import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Table,
  Divider,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import LaptopIcon from "@mui/icons-material/Laptop";
import ChairIcon from "@mui/icons-material/Chair";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  // Dummy data
  const dummyBorrowedAsset = [
    {
      id: 1,
      name: "Laptop",
      type: "Electronics",
      borrower: "John Doe",
      dateBorrowed: "2024-12-01",
    },
    {
      id: 2,
      name: "Projector",
      type: "Electronics",
      borrower: "Jane Smith",
      dateBorrowed: "2024-12-03",
    },
    {
      id: 3,
      name: "Office Chair",
      type: "Furniture",
      borrower: "Alice Brown",
      dateBorrowed: "2024-12-02",
    },
  ];
  const dummyAssetTypes = [
    { name: "Electronics", count: 2 },
    { name: "Furniture", count: 1 },
  ];
  const dummyTotalBorrowed = 3;
  const [borrowedAssets, setBorrowedAsset] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [totalBorrowed, setTotalBorrowed] = useState(0);

  useEffect(() => {
    setBorrowedAsset(dummyBorrowedAsset);
    setAssetTypes(dummyAssetTypes);
    setTotalBorrowed(dummyTotalBorrowed);
  }, []);

  // Function to create gradient colors for the pie chart
  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );
    gradient.addColorStop(0, "rgba(255, 99, 132, 1)"); // Red
    gradient.addColorStop(0.5, "rgba(54, 162, 235, 1)"); // Blue
    gradient.addColorStop(1, "rgba(75, 192, 192, 1)"); // Green
    return gradient;
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        Admin Dashboard
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log("Audit Assets");
            navigate("/auditAsset");
          }}
        >
          Audit Assets
        </Button>
      </Typography>

      <Grid container spacing={4}>
        {/* Borrowed Asset Table */}
        <Grid item xs={12}>
          <Card
            sx={{
              padding: 3,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Borrowed Assets
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Asset Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Borrower</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Date Borrowed
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {borrowedAssets.map((asset) => (
                  <TableRow key={asset.id} hover>
                    <TableCell>
                      {asset.type === "Electronics" ? (
                        <LaptopIcon sx={{ marginRight: 1 }} />
                      ) : (
                        <ChairIcon sx={{ marginRight: 1 }} />
                      )}
                      {asset.name}
                    </TableCell>
                    <TableCell>{asset.type}</TableCell>
                    <TableCell>{asset.borrower}</TableCell>
                    <TableCell>{asset.dateBorrowed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>

        {/* Total Borrowed Assets */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#1976d2",
              color: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total Borrowed Assets
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              {totalBorrowed}
            </Typography>
          </Card>
        </Grid>

        {/* Assets by Type (Pie Chart) */}
        <Grid item xs={12} sm={6} md={8}>
          <Card
            sx={{
              padding: 3,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
              Assets by Type
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <Pie
                data={{
                  labels: assetTypes.map((assetType) => assetType.name),
                  datasets: [
                    {
                      data: assetTypes.map((assetType) => assetType.count),
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.6)", // Red
                        "rgba(54, 162, 235, 0.6)", // Blue
                        "rgba(75, 192, 192, 0.6)", // Green
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)", // Red
                        "rgba(54, 162, 235, 1)", // Blue
                        "rgba(75, 192, 192, 1)", // Green
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: "bottom" },
                    tooltip: {
                      callbacks: {
                        label: (tooltipItem) =>
                          `${tooltipItem.label}: ${tooltipItem.raw}`,
                      },
                    },
                  },
                }}
                width={20} // Set pie chart width to be smaller
                height={20} // Set pie chart height to be smaller
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
