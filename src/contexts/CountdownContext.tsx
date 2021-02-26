import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from '../contexts/ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}
interface ICountdownProviderProps {
  children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: ICountdownProviderProps) {
  const INITIAL_TIME_COUNTDOWN = 0.05 * 60
  const { startNewChallenge } = useContext(ChallengesContext)
  
  const [time, setTime] = useState(INITIAL_TIME_COUNTDOWN);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time/60);
  const seconds = time % 60;

  function startCountdown(){
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(INITIAL_TIME_COUNTDOWN);
    setHasFinished(false)
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

  
  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}