import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import axios from "axios";
import InterviewerSidebar from "../Interviewer/InterviewerSidebar";
import InterviewerNavbar from "../Interviewer/InterviewerNavbar";

const ViewInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const interviewerName = localStorage.getItem("userName");

  useEffect(() => {
    if (interviewerName) {
      fetchInterviews(interviewerName);
    }
  }, [interviewerName]);

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
      setInterviews(response.data || []);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

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
        {/* Navbar */}
        <InterviewerNavbar title={`My Interviews (${interviewerName || "Interviewer"})`} />

        {/* Main Section */}
        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Typography
            variant="h5"
            sx={{
              color: "#1A237E",
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Interview Summary
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : interviews.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No interviews found for <strong>{interviewerName}</strong>.
            </Typography>
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1A237E" }}>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>#</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Candidate</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Job Title</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Company</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Date</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Type</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Feedback</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Status</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {interviews.map((interview, index) => (
                    <TableRow
                      key={interview.id}
                      sx={{
                        "&:hover": { backgroundColor: "#F1F3F4" },
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell sx={{ fontWeight: "bold", color: "#3949AB" }}>
                        {interview.candidateName}
                      </TableCell>
                      <TableCell>{interview.jobTitle}</TableCell>
                      <TableCell>{interview.companyName}</TableCell>
                      <TableCell>{interview.interviewDate}</TableCell>
                      <TableCell>{interview.interviewType}</TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 200,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {interview.feedback || "No feedback yet"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={interview.status}
                          sx={{
                            fontWeight: "bold",
                            backgroundColor:
                              interview.status === "COMPLETED"
                                ? "#4CAF50"
                                : interview.status === "SCHEDULED"
                                ? "#FFB300"
                                : "#9E9E9E",
                            color: "#fff",
                            px: 1,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewInterviews;
