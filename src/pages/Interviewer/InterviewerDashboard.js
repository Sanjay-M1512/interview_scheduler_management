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
import InterviewerSidebar from "./InterviewerSidebar";
import InterviewerNavbar from "./InterviewerNavbar";

const InterviewerDashboard = () => {
  const [stats, setStats] = useState([
    { name: "Scheduled", value: 0 },
    { name: "Completed", value: 0 },
  ]);

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const interviewerName = localStorage.getItem("userName");

  useEffect(() => {
    if (interviewerName) {
      fetchInterviews(interviewerName);
    }
  }, [interviewerName]);

  // ✅ Fetch interviews by interviewer name
  const fetchInterviews = async (name) => {
    try {
      const response = await axios.get(
        `https://springapp-iagv.onrender.com/api/interviews/interviewer/${encodeURIComponent(
          name
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = response.data || [];
      setInterviews(data);

      // ✅ Calculate dynamic stats
      const scheduled = data.filter((i) => i.status === "SCHEDULED").length;
      const completed = data.filter((i) => i.status === "COMPLETED").length;
      setStats([
        { name: "Scheduled", value: scheduled },
        { name: "Completed", value: completed },
      ]);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const scheduledInterviews = interviews.filter(
    (i) => i.status === "SCHEDULED"
  );
  const completedInterviews = interviews.filter(
    (i) => i.status === "COMPLETED"
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F4F6F8" }}>
      {/* Sidebar (Fixed) */}
      <Box
        sx={{
          width: 260,
          backgroundColor: "#1A237E",
          flexShrink: 0,
          position: "fixed",
          top: 0,
          bottom: 0,
          overflowY: "auto",
          zIndex: 1200,
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <InterviewerSidebar role="INTERVIEWER" />
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
        <InterviewerNavbar title={`Welcome, ${interviewerName || "Interviewer"}`} />
        <Box sx={{ p: 3, flexGrow: 1 }}>
          {/* 🔹 Overview Chart Section */}
          <Typography
            variant="h5"
            sx={{
              color: "#1A237E",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Interview Overview
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

          {/* 🔹 Scheduled Interviews */}
          <Typography
            variant="h5"
            sx={{
              color: "#1A237E",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Scheduled Interviews
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress />
            </Box>
          ) : scheduledInterviews.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No scheduled interviews found.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {scheduledInterviews.map((interview) => (
                <Grid item xs={12} md={6} key={interview.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      p: 2,
                      backgroundColor: "#fff",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "#3949AB" }}>
                      {interview.candidateName}
                    </Typography>
                    <Typography color="text.secondary">
                      Job: {interview.jobTitle}
                    </Typography>
                    <Typography color="text.secondary">
                      Company: {interview.companyName}
                    </Typography>
                    <Typography color="text.secondary">
                      Date: {interview.interviewDate}
                    </Typography>
                    <Typography color="text.secondary">
                      Type: {interview.interviewType}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* 🔹 Completed Interviews */}
          <Typography
            variant="h5"
            sx={{
              color: "#1A237E",
              fontWeight: "bold",
              mt: 5,
              mb: 2,
            }}
          >
            Completed Interviews
          </Typography>

          {completedInterviews.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No completed interviews found.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {completedInterviews.map((interview) => (
                <Grid item xs={12} md={6} key={interview.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      p: 2,
                      backgroundColor: "#fff",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "#4CAF50" }}>
                      {interview.candidateName}
                    </Typography>
                    <Typography color="text.secondary">
                      Job: {interview.jobTitle}
                    </Typography>
                    <Typography color="text.secondary">
                      Feedback: {interview.feedback || "No feedback yet"}
                    </Typography>
                    <Typography color="text.secondary">
                      Company: {interview.companyName}
                    </Typography>
                    <Typography color="text.secondary">
                      Type: {interview.interviewType}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewerDashboard;
