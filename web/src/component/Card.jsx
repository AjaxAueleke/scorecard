import React, { useEffect } from "react";
import styles from "./Card.module.css";
import { io } from "socket.io-client";
const Card = (props) => {
  useEffect(() => {
  }, []);

  return (
    <div className={styles.container}>
      <h1>Aus vs Pakistan</h1>
      <div className={styles.batting}>
        <h2>Batting Side</h2>
        <p>185/1</p>
        <p>15.5</p>
        <div className ={styles.batters}>
          <p>
            Andrew Fletcher <span></span>
          </p>
          <p>
            Light yagami <span></span>
          </p>
        </div>
      </div>
      <div className={styles.bowling}>
          <h2>Bowling Side</h2>
          <p>Imran Tahir <span>5.5 overs</span> <span>2 </span> <span> 23 run</span></p>
      </div>
    </div>
  );
};
export default Card;
