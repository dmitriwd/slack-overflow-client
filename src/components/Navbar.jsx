import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div>
      {props.user ? (
        <>
          <Link to="/protected">What is the meaning of life</Link>
          <button onClick={props.logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/signup">Signup</Link>
          <br />
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
