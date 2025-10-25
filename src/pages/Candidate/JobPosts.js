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
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import apiClient from "../../api/apiClient";

const JobPosts = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await apiClient.get("/job-positions/all");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching job posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
  };

  const handleApply = (jobTitle) => {
    alert(`✅ Application submitted for: ${jobTitle}`);
    setOpen(false);
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
        <Navbar title="Available Job Positions" />
        <Box sx={{ p: 3, flexGrow: 1 }}>
          <Typography variant="h5" sx={{ color: "#1A237E", fontWeight: "bold", mb: 3 }}>
            Explore Open Opportunities
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {jobs.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No job positions available.
                </Typography>
              ) : (
                jobs.map((job) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                        p: 2,
                        backgroundColor: "#fff",
                        height: "230px",
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                          cursor: "pointer",
                        },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                      onClick={() => handleOpen(job)}
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
                          {job.title || "Job Title Unavailable"}
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: "0.9rem", mb: 0.5 }}>
                          Department: {job.department || "N/A"}
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: "0.9rem", mb: 0.5 }}>
                          Location: {job.location || "Remote"}
                        </Typography>
                        <Typography color="text.secondary" sx={{ fontSize: "0.9rem", mb: 0.5 }}>
                          Type: {job.employmentType || "FULL_TIME"}
                        </Typography>
                        <Chip
                          label={job.status || "ACTIVE"}
                          sx={{
                            mt: 1,
                            backgroundColor: job.status === "ACTIVE" ? "#4CAF50" : "#FFB300",
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

      {/* Job Details Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          },
        }}
      >
        {selectedJob && (
          <>
            <DialogTitle
              sx={{
                fontWeight: "bold",
                color: "#1A237E",
                borderBottom: "1px solid #E0E0E0",
              }}
            >
              {selectedJob.title}
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
              <Typography sx={{ mb: 1 }}>
                <strong>Department:</strong> {selectedJob.department || "N/A"}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Location:</strong> {selectedJob.location || "Remote"}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <strong>Employment Type:</strong> {selectedJob.employmentType || "FULL_TIME"}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography sx={{ mb: 1 }}>
                <strong>Description:</strong>
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {selectedJob.description || "No description available."}
              </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
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
              <Button
                variant="contained"
                onClick={() => handleApply(selectedJob.title)}
                sx={{
                  backgroundColor: "#1A237E",
                  "&:hover": { backgroundColor: "#3949AB" },
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Apply Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default JobPosts;
