import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const CandidateDashboard = () => {
  const [stats] = useState([
    { name: "Applied", value: 8 },
    { name: "Screening", value: 4 },
    { name: "Interviewing", value: 3 },
    { name: "Offered", value: 2 },
    { name: "Hired", value: 1 },
  ]);

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      if (!userId) return;
      const response = await axios.get(
        `https://springapp-iagv.onrender.com/api/interviews/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const scheduled = (response.data || []).filter(
        (i) => i.status?.trim().toUpperCase() === "SCHEDULED"
      );
      setInterviews(scheduled);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F4F6F8" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 260,
          backgroundColor: "#1A237E",
          flexShrink: 0,
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          height: "100vh",
          overflowY: "auto",
          zIndex: 1200,
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Sidebar role="CANDIDATE" />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          ml: "260px",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar title="Candidate Dashboard" />

        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Typography variant="h5" sx={{ color: "#1A237E", fontWeight: "bold", mb: 2 }}>
            Interview Statistics
          </Typography>

          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              mb: 4,
              backgroundColor: "#fff",
            }}
          >
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3949AB" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Typography variant="h5" sx={{ color: "#1A237E", fontWeight: "bold", mb: 2 }}>
            Upcoming Interviews
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {interviews.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No upcoming interviews scheduled.
                </Typography>
              ) : (
                interviews.map((interview) => (
                  <Grid item xs={12} md={6} key={interview.id}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        p: 2,
                        backgroundColor: "#fff",
                      }}
                    >
                      <Typography variant="h6" sx={{ color: "#3949AB" }}>
                        {interview.jobTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Company: {interview.companyName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date: {interview.interviewDate}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Type: {interview.interviewType}
                      </Typography>
                      <Typography variant="body2" color="#FFB300" sx={{ mt: 1, fontWeight: "bold" }}>
                        Status: {interview.status}
                      </Typography>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CandidateDashboard;
