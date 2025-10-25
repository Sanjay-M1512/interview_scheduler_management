import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import InterviewerSidebar from "../Interviewer/InterviewerSidebar";
import InterviewerNavbar from "../Interviewer/InterviewerNavbar";

const AddInterview = () => {
  const [formData, setFormData] = useState({
    candidateId: "",
    jobTitle: "",
    companyName: "",
    interviewDate: "",
    interviewType: "",
    timeSlot: "",
    meetingLink: "",
    venue: "",
    status: "SCHEDULED",
    feedback: "",
  });

  const [candidates, setCandidates] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const interviewerName = localStorage.getItem("userName");

  useEffect(() => {
    fetchCandidates();
    fetchTimeSlots();
  }, []);

  // ✅ Fetch candidates
  const fetchCandidates = async () => {
    try {
      const response = await axios.get("https://springapp-iagv.onrender.com/user/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const candidateUsers = response.data.filter(
        (user) => user.role === "CANDIDATE"
      );
      setCandidates(candidateUsers);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  // ✅ Fetch predefined time slots
  const fetchTimeSlots = async () => {
    try {
      const response = await axios.get(
        "https://springapp-iagv.onrender.com/api/interviews/time-slots",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTimeSlots(response.data);
    } catch (error) {
      console.error("Error fetching time slots:", error);
    }
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedCandidate = candidates.find(
        (c) => c.id === Number(formData.candidateId)
      );

      if (!selectedCandidate) {
        toast.error("Please select a valid candidate!");
        setLoading(false);
        return;
      }

      if (!formData.timeSlot) {
        toast.error("Please select a time slot!");
        setLoading(false);
        return;
      }

      if (formData.interviewType === "VIDEO" && !formData.meetingLink) {
        toast.error("Meeting link is required for Video interviews!");
        setLoading(false);
        return;
      }

      if (formData.interviewType === "IN_PERSON" && !formData.venue) {
        toast.error("Venue is required for In-person interviews!");
        setLoading(false);
        return;
      }

      await axios.post(
        "https://springapp-iagv.onrender.com/api/interviews/add",
        {
          user: { id: Number(formData.candidateId) },
          candidateName: selectedCandidate.username,
          interviewerName,
          jobTitle: formData.jobTitle,
          companyName: formData.companyName,
          interviewDate: formData.interviewDate,
          interviewType: formData.interviewType,
          meetingLink: formData.meetingLink || null,
          venue: formData.venue || null,
          timeSlot: formData.timeSlot,
          status: formData.status,
          feedback: formData.feedback,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Interview scheduled successfully!");
      setFormData({
        candidateId: "",
        jobTitle: "",
        companyName: "",
        interviewDate: "",
        interviewType: "",
        timeSlot: "",
        meetingLink: "",
        venue: "",
        status: "SCHEDULED",
        feedback: "",
      });
    } catch (error) {
      console.error("Error scheduling interview:", error);
      toast.error("Failed to schedule interview!");
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
        <InterviewerNavbar title="Schedule Interview" />

        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Card
            sx={{
              width: 600,
              borderRadius: 3,
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              p: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ color: "#1A237E", mb: 2, fontWeight: "bold" }}
              >
                Add New Interview
              </Typography>

              <form onSubmit={handleSubmit}>
                {/* Candidate Dropdown */}
                <TextField
                  select
                  fullWidth
                  label="Candidate"
                  name="candidateId"
                  value={formData.candidateId}
                  onChange={handleChange}
                  margin="normal"
                  required
                >
                  {candidates.length === 0 ? (
                    <MenuItem disabled>No candidates available</MenuItem>
                  ) : (
                    candidates.map((candidate) => (
                      <MenuItem key={candidate.id} value={candidate.id}>
                        {candidate.username} ({candidate.email})
                      </MenuItem>
                    ))
                  )}
                </TextField>

                {/* Job Info */}
                <TextField
                  fullWidth
                  label="Job Title"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  type="date"
                  label="Interview Date"
                  name="interviewDate"
                  value={formData.interviewDate}
                  onChange={handleChange}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />

                {/* Interview Type */}
                <TextField
                  select
                  fullWidth
                  label="Interview Type"
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleChange}
                  margin="normal"
                  required
                >
                  <MenuItem value="VIDEO">Video (Online)</MenuItem>
                  <MenuItem value="IN_PERSON">In-Person (On-site)</MenuItem>
                </TextField>

                {/* Meeting Link or Venue */}
                {formData.interviewType === "VIDEO" && (
                  <TextField
                    fullWidth
                    label="Meeting Link"
                    name="meetingLink"
                    value={formData.meetingLink}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="https://meet.google.com/xyz-abc-pqr"
                    required
                  />
                )}
                {formData.interviewType === "IN_PERSON" && (
                  <TextField
                    fullWidth
                    label="Venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    margin="normal"
                    placeholder="e.g. Infosys Campus, Chennai"
                    required
                  />
                )}

                {/* Time Slot Dropdown */}
                <TextField
                  select
                  fullWidth
                  label="Select Time Slot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  margin="normal"
                  required
                >
                  {timeSlots.length === 0 ? (
                    <MenuItem disabled>Loading time slots...</MenuItem>
                  ) : (
                    timeSlots.map((slot, index) => (
                      <MenuItem key={index} value={slot}>
                        {slot}
                      </MenuItem>
                    ))
                  )}
                </TextField>

                {/* Feedback (Optional) */}
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Feedback (optional)"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  margin="normal"
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    backgroundColor: "#1A237E",
                    "&:hover": { backgroundColor: "#3949AB" },
                    borderRadius: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Add Interview"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AddInterview;
