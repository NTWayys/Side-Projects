import React from "react";
import { letterList } from "../content/wordlist";
import styles from "../styles/Hangman.module.scss";

type props = { guessLetter: Function; lettersGuessed: string[] };

export default function Letters({ guessLetter, lettersGuessed }: props) {
  return (
    <div className={styles.letters}>
      {letterList.map((letter) => {
        return (
          <input
            type="button"
            key={letter}
            disabled={lettersGuessed.includes(letter)}
            value={letter}
            onClick={() => {
              guessLetter(letter);
            }}
            className={`${styles.letter} `}
          />
        );
      })}
    </div>
  );
}
