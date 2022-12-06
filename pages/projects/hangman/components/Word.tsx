import React from "react";
import styles from "../styles/Hangman.module.scss";

type props = { word: string; lettersGuessed: string[]; gameOver: boolean };
export default function Word({ word, lettersGuessed, gameOver }: props) {
  const renderedLetters = word.split("").map((letter, index) => (
    <div key={index} className={styles.letter}>
      <span
        className={
          lettersGuessed.includes(letter) || gameOver
            ? styles.visible
            : styles.invisible
        }
      >
        {lettersGuessed.includes(letter) || gameOver ? letter : "?"}
      </span>
    </div>
  ));

  return <div className={styles["user-word"]}>{renderedLetters}</div>;
}
