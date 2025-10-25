import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import InterviewerSidebar from "./InterviewerSidebar";
import InterviewerNavbar from "./InterviewerNavbar";

const InterviewerProfile = () => {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    department: "",
    role: "",
  });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // ✅ Fetch Interviewer Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://springapp-iagv.onrender.com/user/custom-id/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("📦 Interviewer API Response:", res.data);

        // ✅ Handle both array and object responses
        const dataArray = res.data.data || res.data;
        const data = Array.isArray(dataArray) ? dataArray[0] : dataArray;

        // ✅ Handle snake_case & camelCase naming
        setUserData({
          username: data.username || "",
          email: data.email || "",
          firstName: data.firstName || data.first_name || "",
          lastName: data.lastName || data.last_name || "",
          phoneNumber: data.phoneNumber || data.phone_number || "",
          department: data.department || "",
          role: data.role || "INTERVIEWER",
        });
      } catch (err) {
        console.error("❌ Error fetching interviewer profile:", err);
        toast.error("Failed to load profile details");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, userId]);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // ✅ Handle Save
  const handleSave = async () => {
    try {
      const payload = {
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        department: userData.department,
        role: userData.role,
      };

      await axios.put(
        `https://springapp-iagv.onrender.com/user/update/${userId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Profile updated successfully ✅");
      setEditing(false);
    } catch (err) {
      console.error("❌ Error updating interviewer profile:", err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F4F6F8", minHeight: "100vh" }}>
      {/* 🔹 Interviewer Sidebar */}
      <InterviewerSidebar role="INTERVIEWER" />

      <Box sx={{ flexGrow: 1 }}>
        {/* 🔹 Interviewer Navbar */}
        <InterviewerNavbar title="My Profile" />

        <Box sx={{ p: 4 }}>
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
          ) : (
            <Paper
              elevation={4}
              sx={{
                maxWidth: 800,
                mx: "auto",
                p: 4,
                borderRadius: 4,
                backgroundColor: "#fff",
              }}
            >
              {/* Profile Header */}
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "#1A237E",
                    fontSize: 36,
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  {userData.firstName?.[0]?.toUpperCase() || "U"}
                </Avatar>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#1A237E" }}
                >
                  {userData.firstName} {userData.lastName}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  {userData.role}
                </Typography>
              </Box>

              {/* Editable Fields */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Username"
                    name="username"
                    value={userData.username}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={userData.email}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    fullWidth
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    fullWidth
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Department"
                    name="department"
                    value={userData.department}
                    onChange={handleChange}
                    fullWidth
                    disabled={!editing}
                    placeholder="e.g., Technical Interview Panel"
                  />
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 4,
                  gap: 2,
                }}
              >
                {editing ? (
                  <>
                    <Button
                      variant="outlined"
                      onClick={() => setEditing(false)}
                      sx={{ color: "#1A237E", borderColor: "#1A237E" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                      sx={{
                        backgroundColor: "#1A237E",
                        "&:hover": { backgroundColor: "#3949AB" },
                      }}
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => setEditing(true)}
                    sx={{
                      backgroundColor: "#FFB300",
                      color: "#1A237E",
                      "&:hover": { backgroundColor: "#FFC107" },
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewerProfile;
