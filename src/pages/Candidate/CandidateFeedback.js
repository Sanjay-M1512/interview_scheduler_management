import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Rating,
  Chip,
  IconButton,
} from "@mui/material";
import { FaTimes, FaRegCalendarAlt, FaBuilding, FaUserTie } from "react-icons/fa";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";

const CandidateFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFeedback, setOpenFeedback] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get(`https://springapp-iagv.onrender.com/feedback/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch feedbacks");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [token, userId]);

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
        <Navbar title="My Feedback" />
        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Typography variant="h5" sx={{ color: "#1A237E", fontWeight: "bold", mb: 3 }}>
            My Interview Feedback
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress />
            </Box>
          ) : feedbacks.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No feedback available yet.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {feedbacks.map((fb) => (
                <Grid item xs={12} sm={6} md={4} key={fb.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                      backgroundColor: "#fff",
                      p: 2,
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                      },
                    }}
                    onClick={() => setOpenFeedback(fb)}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ color: "#3949AB", fontWeight: "bold", mb: 1 }}>
                        {fb.interview?.jobTitle || "Job Title"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <FaBuilding style={{ marginRight: 6 }} />
                        {fb.interview?.companyName || "N/A"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <FaRegCalendarAlt style={{ marginRight: 6 }} />
                        {new Date(fb.submittedDate).toLocaleDateString()}
                      </Typography>
                      <Chip
                        label={fb.recommendation?.replace("_", " ") || "Pending"}
                        sx={{
                          backgroundColor:
                            fb.recommendation === "STRONG_HIRE" || fb.recommendation === "HIRE"
                              ? "#43A047"
                              : "#E53935",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      />
                      <Box sx={{ mt: 1 }}>
                        <Rating value={fb.overallRating || 0} readOnly size="small" />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Feedback Dialog */}
        <Dialog
          open={!!openFeedback}
          onClose={() => setOpenFeedback(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3, p: 2, backgroundColor: "#fff" },
          }}
        >
          {openFeedback && (
            <>
              <DialogTitle
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#1A237E",
                  fontWeight: "bold",
                }}
              >
                {openFeedback.interview?.jobTitle} – {openFeedback.interview?.companyName}
                <IconButton onClick={() => setOpenFeedback(null)} size="small">
                  <FaTimes />
                </IconButton>
              </DialogTitle>

              <DialogContent dividers>
                <Typography sx={{ mb: 1 }}>
                  <FaUserTie style={{ marginRight: 6 }} />
                  <strong>Interviewer:</strong> {openFeedback.interview?.interviewerName || "N/A"}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  <FaRegCalendarAlt style={{ marginRight: 6 }} />
                  <strong>Submitted:</strong> {new Date(openFeedback.submittedDate).toLocaleString()}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Ratings
                </Typography>
                {[
                  ["Overall Rating", openFeedback.overallRating],
                  ["Technical Skills", openFeedback.technicalSkillsRating],
                  ["Communication", openFeedback.communicationRating],
                  ["Problem Solving", openFeedback.problemSolvingRating],
                  ["Cultural Fit", openFeedback.culturalFitRating],
                ].map(([label, value]) => (
                  <Box key={label} sx={{ mb: 1 }}>
                    <Typography>{label}</Typography>
                    <Rating value={value || 0} readOnly />
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Typography sx={{ mt: 1 }}>
                  <strong>Strengths:</strong> {openFeedback.strengths || "N/A"}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Weaknesses:</strong> {openFeedback.weaknesses || "N/A"}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Detailed Feedback:</strong> {openFeedback.detailedFeedback || "N/A"}
                </Typography>
              </DialogContent>
            </>
          )}
        </Dialog>
      </Box>
    </Box>
  );
};

export default CandidateFeedback;
