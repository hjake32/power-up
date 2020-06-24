import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = "http://localhost:8888";
      }}
    >Login</button>
  );
};

export default Header;
