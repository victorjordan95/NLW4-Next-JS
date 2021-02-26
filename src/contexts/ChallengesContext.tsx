import { createContext, ReactNode, useEffect, useState } from 'react'

import challenges from '../../challenges.json'

interface IChallenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface IChallengesContextData {
  level: number; 
  currentExperience: number 
  challengesCompleted: number;
  experienceToNextLevel:number;
  activeChallenge: IChallenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void,
  completeChallenge: () => void
}

interface IChallengesProviderProps {
  children: ReactNode
}

export const ChallengesContext = createContext({} as IChallengesContextData)

export function ChallengesProvider({ children }: IChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelUp() {
    setLevel(level + 1)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo Desafio 🎉", {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  
  return (
    <ChallengesContext.Provider value={{ 
      level, 
      currentExperience, 
      challengesCompleted, 
      activeChallenge,
      experienceToNextLevel,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completeChallenge
      }}
    >
      { children }
    </ChallengesContext.Provider>
  )

}