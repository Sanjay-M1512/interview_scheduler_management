import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import loginAnimation from "../assets/Login.json"; // Animation
import bgImage from "../assets/bg.jpg"; // Background image

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://springapp-iagv.onrender.com/user/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const { token, role, firstName, lastName, id, email } = response.data;

      // ✅ Store user details
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);
      localStorage.setItem("userName", `${firstName} ${lastName}`);
      localStorage.setItem("email", email);

      toast.success(`Welcome ${firstName}!`);

      // ✅ Redirect based on role
      if (role === "CANDIDATE") navigate("/dashboard/candidate");
      else if (role === "INTERVIEWER") navigate("/dashboard/interviewer");
      else navigate("/dashboard");
    } catch (error) {
      console.error("❌ Login failed:", error);
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

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
      {/* Layout: Animation + Login Card */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          width: "100%",
          maxWidth: "1100px",
        }}
      >
        {/* 🟢 Lottie Animation (Left Side) */}
        <Box
          sx={{
            width: { xs: "85%", md: 420 },
            height: { xs: 280, md: 400 },
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
            animationData={loginAnimation}
            loop
            autoplay
            style={{
              width: "100%",
              height: "100%",
              transform: "scale(1.05)",
            }}
          />
        </Box>

        {/* 🟣 Login Card */}
        <Card
          sx={{
            width: 400,
            padding: 4,
            borderRadius: 4,
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.25)",
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
                mb: 3,
              }}
            >
              Interview Management Login
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.3,
                  backgroundColor: "#1A237E",
                  "&:hover": { backgroundColor: "#3949AB" },
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>

              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  textAlign: "center",
                  color: "#212121",
                }}
              >
                Don’t have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  style={{
                    color: "#FFB300",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Register
                </span>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
