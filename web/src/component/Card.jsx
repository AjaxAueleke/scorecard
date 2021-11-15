import React, { useEffect } from 'react';
import styles from './Card.module.css';
import { io } from "socket.io-client";

const Card = (props) => {
    useEffect(()=> {

        return () => io.close();
    }, [])




    return (<div className={styles.container}>
        <h1>Aus vs Pakistan</h1>
    </div>);
}
export default Card;