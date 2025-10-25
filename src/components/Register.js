import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Lottie from "lottie-react";

// 🟢 Animations
import registerAnimation from "../assets/register.json";
import successAnimation from "../assets/AC.json";
import bgImage from "../assets/bg.jpg";

const roles = ["CANDIDATE", "INTERVIEWER"];

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // ✅ Controls thank-you animation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("https://springapp-iagv.onrender.com/user/register", {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        passwordHash: formData.password,
        role: formData.role,
      });

      toast.success("Registration successful!");
      setShowSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Registration failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Success screen after registration
  if (showSuccess) {
    return (
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(26,35,126,0.75), rgba(26,35,126,0.75)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Lottie
          animationData={successAnimation}
          loop={false}
          autoplay
          style={{ width: 300, height: 300 }}
        />
        <Typography
          variant="h5"
          sx={{ mt: 2, fontWeight: "bold", color: "#fff" }}
        >
          🎉 Account Created Successfully!
        </Typography>
        <Typography variant="body1" sx={{ color: "#E0E0E0", mt: 1 }}>
          Redirecting to Login page...
        </Typography>
      </Box>
    );
  }

  // ✅ Default Registration Page
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        backgroundImage: `linear-gradient(rgba(26,35,126,0.5), rgba(26,35,126,0.5)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          width: "100%",
          maxWidth: "1100px",
        }}
      >
        {/* 🟢 Lottie Animation (Left side) */}
        <Box
          sx={{
            width: { xs: "85%", md: 380 },
            height: { xs: 250, md: 350 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 3,
            p: 2,
            backdropFilter: "blur(6px)",
          }}
        >
          <Lottie
            animationData={registerAnimation}
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </Box>

        {/* 🟣 Register Card */}
        <Card
          sx={{
            width: 400,
            padding: 3,
            borderRadius: 3,
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
            backgroundColor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                color: "#1A237E",
                fontWeight: "bold",
                textAlign: "center",
                mb: 2,
              }}
            >
              Create Your Account
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="dense"
                required
              />
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                margin="dense"
                required
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                margin="dense"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="dense"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="dense"
                required
              />
              <TextField
                select
                fullWidth
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                margin="dense"
                required
              >
                {roles.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </TextField>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.2,
                  backgroundColor: "#1A237E",
                  "&:hover": { backgroundColor: "#3949AB" },
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                {loading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  "Register"
                )}
              </Button>

              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  textAlign: "center",
                  color: "#212121",
                }}
              >
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  style={{
                    color: "#FFB300",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </span>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Register;
