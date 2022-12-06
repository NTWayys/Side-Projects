import React from "react";
import styles from "../styles/Hangman.module.scss";

type props = { incorrectGuesses: number };
export default function Drawing({ incorrectGuesses }: props) {
  return (
    <div className={styles.drawing}>
      <div className={styles["top-bar"]} />
      <div className={styles["hanging-bar"]} />
      <div className={styles["center-bar"]} />
      <div className={styles["bottom-bar"]} />
      <div className={styles.man}>
        {bodyPartsArr.slice(0, incorrectGuesses)}
      </div>
    </div>
  );
}
const bodyPartsArr = [
  <div key={"head"} className={styles.head} />,
  <div key={"body"} className={styles.body} />,
  <div key={"arml"} className={styles.arm} />,
  <div key={"armr"} className={`${styles.arm} ${styles["right-arm"]}`} />,
  <div key={"legl"} className={styles.leg} />,
  <div key={"legr"} className={`${styles.leg} ${styles["right-leg"]}`} />,
];
