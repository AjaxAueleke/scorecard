import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Card.module.css";
import { io } from "socket.io-client";

const Card = (props) => {
  const socket = io();
  socket.on("chat_message", (msg) => {
    console.log(msg);
    setIsChanged(!isChanged);
  });
  useEffect(() => {
    socket.on("chat_message", () => {
      console.log("Hello");
    });
  }, [socket]);
  const [isChanged, setIsChanged] = useState();
  const [stats, setStats] = useState({
    side1: {
      name: "Australia",
      batting: true,
    },
    side2: { name: "Pakistan", batting: false },
    wickets: 5,
    runs: 110,
    batting: {
      bat1: { name: "Babar Azam", score: 56 },
      bat2: { name: "Muhammad Rizwan", score: 95 },
      onStrike: 1,
    },
    overs: 50,
    bowling: {
      currBowler: "Imran Tahir",
      oversBowled: 10,
      wicketsTaken: 5,
    },
  });
  useEffect(() => {
    axios
      .get("/score")
      .then((res) => {
        console.log(res);
        setStats(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [isChanged]);

  return (
    <div className={styles.container}>
      <h1>
        {stats.side1.name}({stats.side1.batting ? "Bat" : "Bowl"}) vs{" "}
        {stats.side2.name}({stats.side2.batting ? "Bat" : "Bowl"})
      </h1>
      <div className={styles.batting}>
        <h2>Batting Side</h2>
        <p>
          {stats.runs}/{stats.runs}
        </p>
        <p>{stats.overs}</p>
        <div className={styles.batters}>
          <p>{stats.batting.bat1.name}</p>
          <span>{stats.batting.bat1.score}</span>

          <p>{stats.batting.bat2.name}</p>
          <span>{stats.batting.bat2.score}</span>
        </div>
      </div>
      <div className={styles.bowling}>
        <h2>Bowling Side</h2>
        <p>{stats.bowling.currBowler}</p>
        <span>{stats.bowling.oversBowled}</span>
      </div>
    </div>
  );
};
export default Card;
