import { useState } from "react";
const State = () => {
  const [isRunningPomodoro, setIsPomodoro] = useState(false);
  const [isRunningShortBreak, setIsShortBreak] = useState(false);
  const [isRunningLongBreak, setIsLongBreak] = useState(false);
  //   const [category, setCategory] = useState(0);
  //   const [timeRef, setTimeRef] = useState(false);
  const setIsRunningPomodoro = (value) => {
    setIsPomodoro(value);
  };
  const setIsRunningShortBreak = (value) => {
    setIsShortBreak(value);
  };
  const setIsRunningLongBreak = (value) => {
    setIsLongBreak(value);
  };
  let categoryRef;
  let timerRef;
  return {
    isRunningPomodoro,
    setIsRunningPomodoro,
    isRunningShortBreak,
    setIsRunningShortBreak,
    isRunningLongBreak,
    setIsRunningLongBreak,
    categoryRef,
    timerRef,
  };
};
export default State;
