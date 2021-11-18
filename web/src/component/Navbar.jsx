import React from "react";
import styles from "./Navbar.module.css";
import {useHistory} from 'react-router-dom';
const NavBar = (props) => {
  const history = useHistory();
  return (
    <nav className={styles.navbar}>
      <h1>{props.heading}</h1>
      <div className={styles.navigation}>
        <p onClick ={() => {
          history.push("/input")
        }}>Controller</p>
        <p onClick = {() => {
          history.push("/");
        }}>ScoreBoard</p>
      </div>
    </nav>
  );
};

export default NavBar;
