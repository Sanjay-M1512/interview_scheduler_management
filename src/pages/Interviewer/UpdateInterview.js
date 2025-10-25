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
  Modal,
  TextField,
  MenuItem,
  Button,
  Card,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import InterviewerSidebar from "./InterviewerSidebar";
import InterviewerNavbar from "./InterviewerNavbar";

const UpdateInterview = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");

  const token = localStorage.getItem("token");
  const interviewerName = localStorage.getItem("userName");

  // ✅ Fetch interviews
  const fetchInterviews = async () => {
    try {
      const response = await axios.get(
        `https://springapp-iagv.onrender.com/api/interviews/interviewer/${encodeURIComponent(
          interviewerName
        )}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInterviews(response.data || []);
    } catch (error) {
      console.error("Error fetching interviews:", error);
      toast.error("Failed to fetch interviews");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update interview status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `https://springapp-iagv.onrender.com/api/interviews/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Interview status updated successfully ✅");
      setSelectedInterview(null);
      fetchInterviews();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update interview status");
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

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
        <InterviewerNavbar title="Update Interview Status" />

        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Typography variant="h5" sx={{ color: "#1A237E", fontWeight: "bold", mb: 3 }}>
            My Scheduled Interviews
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
            <Typography color="text.secondary">
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
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Status</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Action</TableCell>
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
                      <TableCell>
                        <Chip
                          label={interview.status}
                          sx={{
                            fontWeight: "bold",
                            backgroundColor:
                              interview.status === "COMPLETED" ? "#4CAF50" : "#FFB300",
                            color: "#fff",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setSelectedInterview(interview);
                            setUpdatedStatus(interview.status);
                          }}
                          sx={{
                            borderColor: "#1A237E",
                            color: "#1A237E",
                            "&:hover": { backgroundColor: "#E8EAF6" },
                          }}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>

      {/* ✅ Fixed Modal Implementation */}
      <Modal
        open={Boolean(selectedInterview)}
        onClose={() => setSelectedInterview(null)}
        aria-labelledby="update-status-modal"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
        }}
      >
        <Box sx={{ outline: "none" }}>
          {selectedInterview ? (
            <Card
              sx={{
                width: 500,
                borderRadius: 4,
                p: 4,
                boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                backgroundColor: "#fff",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#1A237E", mb: 2 }}
              >
                Update Interview Status
              </Typography>

              <Typography sx={{ mb: 1 }}>
                <strong>Candidate:</strong> {selectedInterview.candidateName}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Job Title:</strong> {selectedInterview.jobTitle}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Company:</strong> {selectedInterview.companyName}
              </Typography>
              <Typography sx={{ mb: 3 }}>
                <strong>Date:</strong> {selectedInterview.interviewDate}
              </Typography>

              <TextField
                select
                fullWidth
                label="Status"
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
                sx={{ mb: 3 }}
              >
                <MenuItem value="SCHEDULED">Scheduled</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
              </TextField>

              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  onClick={() => setSelectedInterview(null)}
                  variant="outlined"
                  sx={{
                    color: "#1A237E",
                    borderColor: "#1A237E",
                    "&:hover": { backgroundColor: "#E8EAF6" },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#4CAF50",
                    "&:hover": { backgroundColor: "#43A047" },
                  }}
                  onClick={() =>
                    updateStatus(selectedInterview.id, updatedStatus)
                  }
                >
                  Save Changes
                </Button>
              </Box>
            </Card>
          ) : null}
        </Box>
      </Modal>
    </Box>
  );
};

export default UpdateInterview;
