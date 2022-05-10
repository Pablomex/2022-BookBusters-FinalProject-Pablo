import { Button } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function LinkButton({ to, text }) {
  const location = useLocation();

  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Button
        color={location.pathname === to ? "secondary" : "primary"}
        variant="contained"
      >
        {text}
      </Button>
    </Link>
  );
}

export default LinkButton;
