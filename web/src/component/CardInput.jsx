import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CardInput.module.css";
const CardInput = () => {
  const [isLoading, setIsLoading] = useState(false);
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
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e);
    axios.post(`/score`, stats);
  };
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/score")
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setStats(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err.message);
      });
  }, []);
  return (
    <div className={styles.card}>
      <h1>Match Input</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="Team1">
          Team 1 :
          <input
            name="Team1"
            id="Team1"
            type="text"
            value={stats.side1.name}
            onChange={(e) => {
              setStats((prevState) => {
                return {
                  ...prevState,
                  side1: {
                    name: e.target.value,
                    batting: prevState.side1.batting,
                  },
                };
              });
            }}
          />
        </label>
        <label htmlFor="Team2">
          Team 2 :
          <input
            name="Team2"
            id="Team2"
            type="text"
            value={stats.side2.name}
            onChange={(e) => {
              setStats((prevState) => {
                return {
                  ...prevState,
                  side2: {
                    name: e.target.value,
                    batting: prevState.side2.batting,
                  },
                };
              });
            }}
          />
        </label>
        <label htmlFor="wickets">
          Wickets :
          <input
            name="wickets"
            id="wickets"
            type="number"
            min="0"
            max="9"
            step="1"
            value={stats.wickets}
            onChange={(e) => {
              setStats((prevState) => {
                return {
                  ...prevState,
                  wickets: e.target.value,
                };
              });
            }}
          />
        </label>
        <label htmlFor="runs">
          Runs:
          <input
            name="runs"
            id="runs"
            type="number"
            min="0"
            max="500"
            step="1"
            value={stats.runs}
            onChange={(e) => {
              setStats((prevState) => {
                return {
                  ...prevState,
                  runs: e.target.value,
                };
              });
            }}
          />
        </label>
        <label htmlFor="overs">
          Overs :
          <input
            name="overs"
            id="overs"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={stats.overs}
            onChange={(e) => {
              setStats((prevState) => {
                return {
                  ...prevState,
                  overs: e.target.value,
                };
              });
            }}
          />
        </label>
        <label htmlFor="batting1">
          Batsman(1) :
          <input
            name="batting1"
            id="batting1"
            type="text"
            value={stats.batting.bat1.name}
            onChange={(e) => {
              setStats((prevState) => {
                return {
                  ...prevState,
                  batting: {
                    bat1: {
                      name: e.target.value,
                      score: prevState.batting.bat1.score,
                    },
                    bat2: prevState.batting.bat2,
                  },
                };
              });
            }}
          />
        </label>
        <label htmlFor="batting1score">
          Batsman(1) runs:
          <input
            name="batting1score"
            id="batting1score"
            type="number"
            value={stats.batting.bat1.score}
            min="0"
            max="500"
            step="1"
            onChange={(e) => {
              setStats((prevState) => {
                return {
                  ...prevState,
                  batting: {
                    bat1: {
                      name: prevState.batting.bat1.name,
                      score: e.target.value,
                    },
                    bat2: prevState.batting.bat2,
                  },
                };
              });
            }}
          />
        </label>
        <label htmlFor="batting2">
          Batsman(2) :
          <input
            name="batting2"
            id="batting2"
            type="text"
            value={stats.batting.bat2.name}
            onChange={(e) => {
              setStats((prevState) => {
                return {
                  ...prevState,
                  batting: {
                    bat2: {
                      name: e.target.value,
                      score: prevState.batting.bat2.score,
                    },
                    bat1: prevState.batting.bat1,
                  },
                };
              });
            }}
          />
        </label>

        <label htmlFor="batting2score">
          Batsman(2) runs :
          <input
            name="batting2score"
            id="batting2score"
            type="number"
            value={stats.batting.bat2.score}
            min="0"
            max="500"
            step="1"
            onChange={(e) => {
              setStats((prevState) => {
                return {
                  ...prevState,
                  batting: {
                    bat2: {
                      name: prevState.batting.bat2.name,
                      score: e.target.value,
                    },
                    bat1: prevState.batting.bat1,
                  },
                };
              });
            }}
          />
        </label>
        <label htmlFor="bowling">
          Bowling:
          <input
            name="bowling"
            id="bowling"
            type="text"
            value={stats.bowling.currBowler}
            onChange={(e) => {
              setStats((prevState) => {
                return {
                  ...prevState,
                  bowling: {
                    currBowler: e.target.value,
                    oversBowled: prevState.bowling.oversBowled,
                    wicketsTaken: prevState.bowling.wicketsTaken,
                  },
                };
              });
            }}
          />
        </label>

        <label htmlFor="bowlingovers">
          OversBowled:
          <input
            name="bowlingovers"
            id="bowlingovers"
            type="number"
            value={stats.bowling.oversBowled}
            min="0"
            step="0.1"
            onChange={(e) => {
              setStats((prevState) => {
                return {
                  ...prevState,
                  bowling: {
                    currBowler: prevState.bowling.currBowler,
                    oversBowled: e.target.value,
                    wicketsTaken: prevState.bowling.wicketsTaken,
                  },
                };
              });
            }}
          />
        </label>
        <label htmlFor="bowlingwickets">
          Wickets Taken:
          <input
            name="bowlingwickets"
            id="bowlingewickets"
            type="number"
            value={stats.bowling.wicketsTaken}
            min="0"
            step="1"
            onChange={(e) => {
              setStats((prevState) => {
                return {
                  ...prevState,
                  bowling: {
                    currBowler: prevState.bowling.currBowler,
                    oversBowled: prevState.bowling.oversBowled,
                    wicketsTaken: e.target.value,
                  },
                };
              });
            }}
          />
        </label>

        <br />
        <button type="submit" disabled={isLoading}>
          Publish
        </button>
      </form>
    </div>
  );
};

export default CardInput;
