import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Candidate";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/candidate/profile");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        color: "#1A237E",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Page Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#1A237E",
          }}
        >
          {title}
        </Typography>

        {/* Right: User Info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: "#3949AB",
              textTransform: "capitalize",
            }}
          >
            {userName}
          </Typography>

          {/* 🟡 Avatar — Click to go to Candidate Profile */}
          <Avatar
            sx={{
              bgcolor: "#FFB300",
              color: "#1A237E",
              fontWeight: "bold",
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              "&:hover": {
                transform: "scale(1.08)",
                opacity: 0.85,
              },
            }}
            onClick={handleProfileClick}
          >
            {userName.charAt(0).toUpperCase()}
          </Avatar>

          {/* 🔴 Logout Icon */}
          <IconButton
            onClick={handleLogout}
            color="error"
            sx={{
              "&:hover": { color: "#D32F2F" },
            }}
          >
            <FaSignOutAlt />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
