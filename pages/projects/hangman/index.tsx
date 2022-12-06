import React, {
  BaseSyntheticEvent,
  DOMElement,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import Head from "next/head";
import styles from "./styles/Hangman.module.scss";

import { wordList } from "./content/wordlist";
import Drawing from "./components/Drawing";
import Word from "./components/Word";
import Letters from "./components/Letters";
import Link from "next/link";

export default function HangManPage() {
  const [word, setWord] = useState("");
  const [lettersGuessed, setLettersGuessed] = useState<string[]>([]);
  console.log(word);

  const incorrectGuesses =
    lettersGuessed.filter((letter) => !word.includes(letter)).length | 0;
  const correctGuesses =
    lettersGuessed.filter((letter) => word.includes(letter)).length | 0;

  function guessLetter(value: string) {
    setLettersGuessed((prev) => {
      if (prev.includes(value)) return prev;
      return [...prev, value];
    });
  }
  function resetWord() {
    setLettersGuessed([]);
    setWord(wordList[Math.floor(Math.random() * wordList.length)]);
  }
  useEffect(() => {
    // for first load
    resetWord();
  }, []);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      guessLetter(key);
    };
    document.addEventListener("keypress", keyHandler);
    return () => {
      document.removeEventListener("keypress", keyHandler);
    };
  }, []);

  const win = correctGuesses === word.split("").length;
  const gameOver = incorrectGuesses > 6 || win === true;

  return (
    <div className={styles.container}>
      <Head>
        <title>Hangman</title>
        <meta name="description" content="Hangman Game" />
      </Head>
      <main className={styles.hangman}>
        <h1>Hangman</h1>
        <Drawing incorrectGuesses={incorrectGuesses} />
        <Word lettersGuessed={lettersGuessed} gameOver={gameOver} word={word} />
        {!gameOver ? (
          <Letters lettersGuessed={lettersGuessed} guessLetter={guessLetter} />
        ) : (
          <div className={styles.endgame}>
            <span className={`${styles.gameover} ${win ? styles.win : ""}`}>
              {win ? "VICTORY" : "DEFEAT"}
            </span>
            <div className={styles["reset-btns"]}>
              <button className={styles["reset-btn"]} onClick={resetWord}>
                Reset Word
              </button>
              <Link
                className={styles["reset-btn"]}
                href={`https://www.dictionary.com/browse/${word}`}
                target="_blank"
              >
                Lookup word
              </Link>
            </div>
          </div>
        )}
      </main>
      {/* <footer>No foot</footer> */}
    </div>
  );
}
