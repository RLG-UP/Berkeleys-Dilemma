import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import heartImage from "../images/heart.png";
import animal1 from "../images/animal1.png";
import animal2 from "../images/animal2.webp";
import animal3 from "../images/animal3.png";
import animal4 from "../images/animal2.png";
import animal5 from "../images/animal5.png";
import animal6 from "../images/animal6.png";
import clickSound from "../sounds/gun.mp3";
import start from "../sounds/start.mp3";
import splat from "../sounds/splat.mp3";
import explosion from "../images/3iCN.gif";
import styles from './AimTraining.module.css';  // Assuming you are using CSS Modules
import { useBerkeleysContext, updateScore } from '../../../src/context/DirectoryProvider';
import TopPlayersTable from './TopTable';

const animalImages = [animal1, animal2, animal3, animal4, animal5, animal6];

const AimTraining = () => {
  const { state, dispatch } = useBerkeleysContext();
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [lives, setLives] = useState(3);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gifPositions, setGifPositions] = useState([]);
  const gameAreaRef = useRef(null); // Reference to the game area

  useEffect(() => {
    if (!gameStarted) return;

    const moveTarget = setInterval(() => {
      if (!clicked) {
        setLives((prevLives) => (prevLives > 0 ? prevLives - 1 : 0));
      }

      setPosition({
        top: Math.random() * 80 + "%",
        left: Math.random() * 80 + "%",
      });

      setCurrentAnimalIndex(Math.floor(Math.random() * animalImages.length));
      setClicked(false);
    }, 1200);

    return () => clearInterval(moveTarget);
  }, [clicked, gameStarted]);


  useEffect(() => {
    if (score > state.user.bestScore) {
      // Call updateScore when the score is greater than the best score
      if(state.loggedState === true){
        console.log("#####ABOUT TO CHANGE RECORD");
        updateScore(dispatch, state.user._id, score);
      }
    }
  }, [score, state.user.bestScore, updateScore]);


  const handleClick = (event) => {
    const gunAudio = new Audio(clickSound);
    const splatAudio = new Audio(splat);

    gunAudio.play();
    splatAudio.play();

    // Using the ref to get the game area DOM element
    const gameArea = gameAreaRef.current;
    if (gameArea) {
      const rect = gameArea.getBoundingClientRect();
      const gifTop = event.clientY - rect.top + "px";
      const gifLeft = event.clientX - rect.left + "px";
      setScore(score + 1);

      setGifPositions((prevPositions) => [
        ...prevPositions,
        { top: gifTop, left: gifLeft, id: Date.now() },
      ]);

      setClicked(true);
      setPosition({
        top: Math.random() * 80 + "%",
        left: Math.random() * 80 + "%",
      });
      setCurrentAnimalIndex(Math.floor(Math.random() * animalImages.length));
    }
  };

  const startGame = () => {
    const startAudio = new Audio(start);
    startAudio.play();

    setScore(0);
    setLives(3);
    setGifPositions([]);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setLives(3);
    setGifPositions([]);
  };

  useEffect(() => {
    if (gifPositions.length === 0) return;

    const timeoutIds = gifPositions.map((gif, index) =>
      setTimeout(() => {
        setGifPositions((prevPositions) =>
          prevPositions.filter((_, idx) => idx !== index)
        );
      }, 500)
    );

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [gifPositions]);

  return (
    <div className={`${styles.container} ${styles.body}`}>
      <div className="d-flex flex-column justify-content-between h-100 py-3">
        <div
          className={styles.game_container}
          style={{ cursor: "crosshair", position: "relative" }}
          ref={gameAreaRef} // Assigning the ref to the game area
        >
          {/* Top Bar with Score, Best Score, and Lives */}
          <div className={`${styles.score_container} d-flex justify-content-between align-items-center w-100`}>
            {/* Score on the top-left */}
            <div className="d-flex align-items-center ms-2 col-6">
              <h1 className={styles.h1}>Score: {score}</h1>
            </div>

            {/* Best Score on the top-right */}
            <div className="d-flex flex-column align-items-end me-4 col-6 ">
            {/* Best Score */}
            <div className={`${styles.best_score} mt-2 me-3`}>{state.loggedState? `Best: ${state.user.bestScore}` : `Log To Save`}</div>
            
            {/* Lives container */}
            <div className={`${styles.lives_container} mt-4 me-3`}>
              {Array.from({ length: lives }).map((_, index) => (
                <Image key={index} src={heartImage} alt="Heart" width={35} height={35} />
              ))}
            </div>
          </div>

          </div>

          {/* Game Area */}
          {gameStarted ? (
            <>
              {lives > 0 ? (
                <div className={styles.game_area}>
                  <Image
                    onClick={handleClick}
                    src={animalImages[currentAnimalIndex]}
                    alt="Animal"
                    className={styles.animal}
                    style={{
                      position: "absolute",
                      top: position.top,
                      left: position.left,
                      cursor: "pointer",
                    }}
                    width={100}
                    height={100}
                  />
                  {gifPositions.map((gifPosition) => (
                    <Image
                      key={gifPosition.id}
                      src={explosion}
                      alt="Explosion"
                      className={styles.animal_gif}
                      style={{
                        position: "absolute",
                        top: gifPosition.top,
                        left: gifPosition.left,
                        width: "100px",
                        height: "100px",
                        animation: "scale-up 0.5s ease-in-out",
                      }}
                      width={100}
                      height={100}
                    />
                  ))}
                </div>
              ) : (
                <div className="d-flex justify-content-center align-items-center h-50">
                  <div className="d-flex flex-column justify-content-center align-items-center text-center">
                    <h2 className={`${styles.game_over} ${styles.h2} mb-3`}>GAME OVER</h2>
                    <h2 className={`${styles.score_over} ${styles.h2} mb-3`}>Score: {score}</h2>
                    <button
                      className={`${styles.button} btn`}
                      onClick={resetGame}
                    >
                      Try again
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center mt-5 h-50">
              <button
                className={`${styles.button} btn`}
                onClick={startGame}
              >
                Play
              </button>
            </div>
          )}
        </div>
      </div>

      <TopPlayersTable />
    </div>
  );
};

export default AimTraining;
