import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Rating,
  CircularProgress,
  Divider,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import InterviewerSidebar from "./InterviewerSidebar";
import InterviewerNavbar from "./InterviewerNavbar";

const InterviewerFeedback = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [feedback, setFeedback] = useState({
    interviewId: "",
    overallRating: 0,
    technicalSkillsRating: 0,
    communicationRating: 0,
    culturalFitRating: 0,
    problemSolvingRating: 0,
    strengths: "",
    weaknesses: "",
    detailedFeedback: "",
    recommendation: "",
    wouldInterviewAgain: false,
  });

  const token = localStorage.getItem("token");
  const interviewerId = localStorage.getItem("userId");
  const interviewerName = localStorage.getItem("userName");

  // ✅ Fetch completed interviews
  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const res = await axios.get(
          `https://springapp-iagv.onrender.com/api/interviews/interviewer/${encodeURIComponent(
            interviewerName
          )}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const completed = res.data.filter((i) => i.status === "COMPLETED");
        setInterviews(completed);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load interviews");
      } finally {
        setLoading(false);
      }
    };
    fetchCompleted();
  }, [interviewerName, token]);

  // ✅ When selecting an interview
  const handleInterviewSelect = (e) => {
    const interviewId = e.target.value;
    const selected = interviews.find((i) => i.id === interviewId);
    setFeedback({ ...feedback, interviewId });
    setSelectedUserId(selected?.user?.id || null);
  };

  // ✅ Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  // ✅ Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.interviewId) {
      toast.warning("Please select an interview!");
      return;
    }
    if (!selectedUserId) {
      toast.error("Candidate user ID missing. Please reselect the interview.");
      return;
    }

    try {
      await axios.post(
        "https://springapp-iagv.onrender.com/feedback/add",
        {
          interview: { id: feedback.interviewId },
          interviewer: { id: interviewerId },
          user: { id: selectedUserId },
          overallRating: feedback.overallRating,
          technicalSkillsRating: feedback.technicalSkillsRating,
          communicationRating: feedback.communicationRating,
          culturalFitRating: feedback.culturalFitRating,
          problemSolvingRating: feedback.problemSolvingRating,
          strengths: feedback.strengths,
          weaknesses: feedback.weaknesses,
          detailedFeedback: feedback.detailedFeedback,
          recommendation: feedback.recommendation,
          wouldInterviewAgain: feedback.wouldInterviewAgain,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Feedback submitted successfully 🎉");

      setFeedback({
        interviewId: "",
        overallRating: 0,
        technicalSkillsRating: 0,
        communicationRating: 0,
        culturalFitRating: 0,
        problemSolvingRating: 0,
        strengths: "",
        weaknesses: "",
        detailedFeedback: "",
        recommendation: "",
        wouldInterviewAgain: false,
      });
      setSelectedUserId(null);
    } catch (err) {
      console.error(err);
      toast.error("Error submitting feedback!");
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
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
          minHeight: "100vh",
        }}
      >
        <InterviewerNavbar title="Submit Interview Feedback" />

        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Typography
            variant="h5"
            sx={{ color: "#1A237E", fontWeight: "bold", mb: 3 }}
          >
            Interview Feedback Form
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                maxWidth: 800,
                mx: "auto",
                p: 4,
              }}
            >
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {/* Select Interview */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1, color: "#1A237E" }}
                  >
                    Select Completed Interview
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    name="interviewId"
                    value={feedback.interviewId}
                    onChange={handleInterviewSelect}
                    sx={{ mb: 3 }}
                    required
                  >
                    {interviews.length > 0 ? (
                      interviews.map((i) => (
                        <MenuItem key={i.id} value={i.id}>
                          {i.candidateName} — {i.jobTitle} ({i.companyName})
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No completed interviews available</MenuItem>
                    )}
                  </TextField>

                  <Divider sx={{ mb: 3 }} />

                  {/* Ratings */}
                  <Typography
                    variant="h6"
                    sx={{ color: "#1A237E", fontWeight: "bold", mb: 2 }}
                  >
                    Ratings
                  </Typography>

                  {[
                    ["Overall Rating", "overallRating"],
                    ["Technical Skills", "technicalSkillsRating"],
                    ["Communication", "communicationRating"],
                    ["Cultural Fit", "culturalFitRating"],
                    ["Problem Solving", "problemSolvingRating"],
                  ].map(([label, field]) => (
                    <Box key={field} sx={{ mb: 2 }}>
                      <Typography>{label}</Typography>
                      <Rating
                        value={feedback[field]}
                        onChange={(e, val) =>
                          setFeedback({ ...feedback, [field]: val })
                        }
                      />
                    </Box>
                  ))}

                  <Divider sx={{ my: 3 }} />

                  {/* Feedback Details */}
                  <Typography
                    variant="h6"
                    sx={{ color: "#1A237E", fontWeight: "bold", mb: 2 }}
                  >
                    Feedback Details
                  </Typography>
                  <TextField
                    label="Strengths"
                    name="strengths"
                    value={feedback.strengths}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={2}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Weaknesses"
                    name="weaknesses"
                    value={feedback.weaknesses}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={2}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Detailed Feedback"
                    name="detailedFeedback"
                    value={feedback.detailedFeedback}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mb: 3 }}
                  />

                  {/* Recommendation */}
                  <Typography
                    variant="h6"
                    sx={{ color: "#1A237E", fontWeight: "bold", mb: 2 }}
                  >
                    Final Recommendation
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    name="recommendation"
                    value={feedback.recommendation}
                    onChange={handleChange}
                    required
                    sx={{ mb: 3 }}
                  >
                    <MenuItem value="HIRE">Hire</MenuItem>
                    <MenuItem value="NO_HIRE">No Hire</MenuItem>
                  </TextField>

                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{
                      mt: 3,
                      py: 1.3,
                      backgroundColor: "#1A237E",
                      "&:hover": { backgroundColor: "#3949AB" },
                      borderRadius: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewerFeedback;
