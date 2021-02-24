import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){
  const INITIAL_TIME_COUNTDOWN = 0.05 * 60
  const { startNewChallenge } = useContext(ChallengesContext)
  
  const [time, setTime] = useState(INITIAL_TIME_COUNTDOWN);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time/60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function startCountdown(){
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(INITIAL_TIME_COUNTDOWN);
  }

  useEffect(() => {
    if(isActive && time > 0){
      countdownTimeout = setTimeout(()=>{
      setTime(time -1)
      }, 1000)
    } else if(isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  },[isActive, time])

  const renderActionsButton = () => {
    return (
      isActive 
      ? (
        <button 
          type='button'
          onClick={resetCountdown}
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
          Abandonar ciclo
        </button>
      )
      : (        
        <button 
          type='button'
          onClick={startCountdown}
          className={styles.countdownButton}>
          Iniciar um Ciclo
        </button>
      )
    )
  }

  return(
      <div>
          <div className={styles.countdownContainer}>
          <div>
            <span>{minuteLeft}</span>
            <span>{minuteRight}</span>
          </div>
          <span>:</span>
          <div>
            <span>{secondLeft}</span>
            <span>{secondRight}</span>
          </div>
      </div>
      { hasFinished ? (
          <button 
            disabled
            className={styles.countdownButton}>
            Ciclo encerrado
          </button>
        )
        : (
          renderActionsButton()
        )
      }

      
      </div>
  );
}