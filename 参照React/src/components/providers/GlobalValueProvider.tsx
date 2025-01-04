"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from "react";

type GlobalValueContextType = {
  globalString: string,
  setGlobalString: Dispatch<SetStateAction<string>>,
  globalBoolean: boolean,
  // setGlobalBoolean: Dispatch<SetStateAction<boolean>>,
  globalNumber: number,
  // setGlobalNumber: Dispatch<SetStateAction<number>>,
  incrementGlobalNumber: () => void,
  decrementGlobalNumber: () => void,
  toggleglobalBoolean: () => void,
} | null;

export const GlobalValueContext = createContext<GlobalValueContextType>(null);

export const  GlobalValueProvider = ({ children }: { children:ReactNode }) => {
  const [globalString, setGlobalString] = useState("初期値")
  const [globalBoolean, setGlobalBoolean] = useState(false)
  const [globalNumber, setGlobalNumber] = useState(0)
  const incrementGlobalNumber = useCallback(() => {
    setGlobalNumber((prev) => prev + 1)
  },[globalNumber])
  const decrementGlobalNumber = useCallback(() => {
    setGlobalNumber((prev) => prev - 1)
  },[globalNumber])
  const toggleglobalBoolean = useCallback(() => {
    setGlobalBoolean((prev) => !prev )
  },[globalBoolean])


  return (
    <GlobalValueContext.Provider value={{ globalString, setGlobalString, globalBoolean, toggleglobalBoolean, globalNumber,  incrementGlobalNumber, decrementGlobalNumber }}>
      {children}
    </GlobalValueContext.Provider>
  );
};
