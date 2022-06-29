import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <AppBar position="relative">
      <Toolbar onClick={() => navigate("/")}>
        <Typography
          sx={{ cursor: "pointer" }}
          variant="h6"
          color="inherit"
          noWrap
        >
          Weather
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
