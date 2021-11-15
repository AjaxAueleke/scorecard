import React from "react";
import styles from "./Navbar.module.css";

const NavBar = (props) => {
  return (
    <nav className={styles.navbar}>
      <h1>{props.heading}</h1>
    </nav>
  );
};

export default NavBar;
