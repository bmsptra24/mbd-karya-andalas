// import { useSelector, useDispatch } from "react-redux";
// import {
//   setIsLongBreakRunning,
//   setIsPomodoroRunning,
//   setIsShortBreakRunning,
//   setTimeIncrement,
//   setTimeReset,
//   setTimeString,
// } from "../Features/pomodoro/Pomodoro";

// export const SendNotification = () => {
//   const { categoryRef } = useSelector((state) => state.pomodoro);
//   if (Notification.permission === "granted") {
//     new Notification(categoryRef + " Finished!", {
//       body: "The " + categoryRef + " has finished. Let's get some break.",
//     });
//   } else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then((permission) => {
//       if (permission === "granted") {
//         new Notification(categoryRef + " Finished!", {
//           body: "The " + categoryRef + " has finished. Let's get some break.",
//         });
//       }
//     });
//   }
// };

// export const FormatTime = (timeInSeconds, duration) => {
//   if (timeInSeconds <= duration * 60) {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = timeInSeconds % 60;

//     return `${minutes.toString().padStart(2, "0")}:${seconds
//       .toString()
//       .padStart(2, "0")}`;
//   } else if (timeInSeconds >= duration * 60) {
//     ResetTimer();
//     SendNotification();
//   }
// };

// export const StartTimerOld = (dispatch) => {
//   const {
//     isPomodoroRunning,
//     isShortBreakRunning,
//     isLongBreakRunning,
//     categoryRef,
//   } = useSelector((state) => state.pomodoro);

//   if (categoryRef === "Pomodoro") {
//     if (!isPomodoroRunning) {
//       dispatch(setIsPomodoroRunning(true));
//     }
//   } else if (categoryRef === "Short Break") {
//     if (!isShortBreakRunning) {
//       dispatch(setIsShortBreakRunning(true));
//     }
//   } else if (categoryRef === "Long Break") {
//     if (!isLongBreakRunning) {
//       dispatch(setIsLongBreakRunning(true));
//     }
//   }
//   console.log(categoryRef);
//   setInterval(() => {
//     dispatch(setTimeIncrement());
//   }, 1000);
// };

// export const StopTimer = () => {
//   const { timerRef } = useSelector((state) => state.pomodoro);
//   const dispatch = useDispatch();
//   dispatch(setIsPomodoroRunning(false));
//   dispatch(setIsShortBreakRunning(false));
//   dispatch(setIsLongBreakRunning(false));
//   clearInterval(timerRef);
// };

// export const ResetTimer = (dispatch) => {
//   StopTimer();
//   dispatch(setTimeReset());
// };

// export const StartTimer = (dispatch, duration) => {
//   const { time } = useSelector((state) => state.pomodoro);
//   dispatch(setIsPomodoroRunning(true));
//   dispatch(setIsShortBreakRunning(true));
//   dispatch(setIsLongBreakRunning(true));
//   setInterval(() => {
//     dispatch(setTimeIncrement());

//     if (time <= duration * 60) {
//       const minutes = Math.floor(time / 60);
//       const seconds = time % 60;
//       const string = `${minutes.toString().padStart(2, "0")}:${seconds
//         .toString()
//         .padStart(2, "0")}`;
//       dispatch(setTimeString(string));
//     } else if (time >= duration * 60) {
//       ResetTimer();
//       SendNotification();
//     }
//   }, 1000);
// };
