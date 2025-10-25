import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaBriefcase, FaCalendarCheck , FaCommentDots} from "react-icons/fa";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const candidateMenu = [
    { text: "Dashboard", icon: <FaHome />, path: "/dashboard/candidate" },
    { text: "Job Posts", icon: <FaBriefcase />, path: "/candidate/jobs" },
    { text: "My Interviews", icon: <FaCalendarCheck />, path: "/candidate/interviews" },
    { text: "My Feedback", icon: <FaCommentDots />, path: "/candidate/feedback" },

  ];

  const menuItems = role === "CANDIDATE" ? candidateMenu : [];

  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#1A237E",
        color: "#fff",
        minHeight: "100vh",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Sidebar Header */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: 3,
            fontWeight: "bold",
            color: "#FFB300",
          }}
        >
          Candidate Portal
        </Typography>

        {/* Menu Items */}
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor:
                  location.pathname === item.path ? "#3949AB" : "transparent",
                borderRadius: 2,
                mb: 1,
                color: "#fff",
                "&:hover": { backgroundColor: "#3949AB" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {item.icon}
                <ListItemText primary={item.text} />
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{ textAlign: "center", opacity: 0.7, mt: 3 }}
      >
        © {new Date().getFullYear()} Interview System
      </Typography>
    </Box>
  );
};

export default Sidebar;
