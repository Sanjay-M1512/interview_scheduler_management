import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Link,
} from "@mui/material";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const CandidateInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }
      const response = await axios.get(
        `https://springapp-iagv.onrender.com/api/interviews/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInterviews(response.data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (interview) => {
    setSelectedInterview(interview);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInterview(null);
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
          ml: "260px", // space for sidebar
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar title="My Interviews" />

        <Box
          sx={{
            p: 3,
            width: "100%",
            maxWidth: "1400px",
            mx: "auto",
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#1A237E", fontWeight: "bold", mb: 3 }}
          >
            Scheduled Interviews
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid
              container
              spacing={3}
              alignItems="stretch"
              justifyContent="flex-start" // 🔹 align cards to the left
              sx={{
                maxWidth: "1300px",
                mx: "auto",
              }}
            >
              {interviews.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No interviews scheduled yet.
                </Typography>
              ) : (
                interviews.map((interview) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={interview.id}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "stretch",
                    }}
                  >
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                        p: 2,
                        backgroundColor: "#fff",
                        height: "250px",
                        width: "100%",
                        maxWidth: 300,
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                          cursor: "pointer",
                        },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                      onClick={() => handleOpen(interview)}
                    >
                      <CardContent sx={{ p: 0 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#3949AB",
                            fontWeight: 600,
                            mb: 0.8,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {interview.jobTitle || "Job Title Unavailable"}
                        </Typography>

                        <Typography
                          color="text.secondary"
                          sx={{ fontSize: "0.9rem", mb: 0.5 }}
                        >
                          Company: {interview.companyName || "N/A"}
                        </Typography>

                        <Typography
                          color="text.secondary"
                          sx={{ fontSize: "0.9rem", mb: 0.5 }}
                        >
                          Date: {interview.interviewDate || "TBD"}
                        </Typography>

                        <Typography
                          color="text.secondary"
                          sx={{ fontSize: "0.9rem", mb: 0.5 }}
                        >
                          Type: {interview.interviewType || "N/A"}
                        </Typography>

                        <Typography
                          color="text.secondary"
                          sx={{ fontSize: "0.9rem", mb: 0.5 }}
                        >
                          Time: {interview.timeSlot || "Not Assigned"}
                        </Typography>

                        <Chip
                          label={interview.status || "SCHEDULED"}
                          sx={{
                            mt: 1,
                            backgroundColor:
                              interview.status === "COMPLETED"
                                ? "#4CAF50"
                                : "#FFB300",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "0.75rem",
                            height: 24,
                            px: 1,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          )}
        </Box>
      </Box>

      {/* Overlay Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          },
        }}
      >
        {selectedInterview && (
          <>
            <DialogTitle
              sx={{
                fontWeight: "bold",
                color: "#1A237E",
                borderBottom: "1px solid #E0E0E0",
              }}
            >
              {selectedInterview.jobTitle || "Interview Details"}
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
              <Typography sx={{ mb: 1 }}>
                <strong>Company:</strong> {selectedInterview.companyName || "N/A"}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Interviewer:</strong>{" "}
                {selectedInterview.interviewerName || "Not Assigned"}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Date:</strong>{" "}
                {selectedInterview.interviewDate || "Not Scheduled"}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Time Slot:</strong>{" "}
                {selectedInterview.timeSlot || "Not Assigned"}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Type:</strong> {selectedInterview.interviewType || "N/A"}
              </Typography>

              {selectedInterview.interviewType === "VIDEO" &&
                selectedInterview.meetingLink && (
                  <Typography sx={{ mb: 1 }}>
                    <strong>Meeting Link:</strong>{" "}
                    <Link
                      href={selectedInterview.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: "#1E88E5", textDecoration: "none" }}
                    >
                      Join Meeting
                    </Link>
                  </Typography>
                )}

              {selectedInterview.interviewType === "IN_PERSON" &&
                selectedInterview.venue && (
                  <Typography sx={{ mb: 1 }}>
                    <strong>Venue:</strong> {selectedInterview.venue}
                  </Typography>
                )}

              <Typography sx={{ mb: 1 }}>
                <strong>Status:</strong>{" "}
                <Chip
                  label={selectedInterview.status || "SCHEDULED"}
                  sx={{
                    backgroundColor:
                      selectedInterview.status === "COMPLETED"
                        ? "#4CAF50"
                        : "#FFB300",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.75rem",
                    ml: 1,
                  }}
                />
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ mb: 1 }}>
                <strong>Candidate Name:</strong>{" "}
                {selectedInterview.candidateName || "N/A"}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Feedback:</strong>
              </Typography>
              <Typography color="text.secondary">
                {selectedInterview.feedback || "No feedback provided yet."}
              </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 2, justifyContent: "flex-end" }}>
              <Button
                onClick={handleClose}
                sx={{
                  color: "#3949AB",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default CandidateInterviews;
