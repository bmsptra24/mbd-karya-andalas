import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const BreakTime = () => {
  const [isBreakTimeScreen, setIsBreakTimeScreen] = useState(false);
  const {
    pomodoroStatus,
    shortBreakDuration,
    longBreakDuration,
    timeRemainingString,
  } = useSelector((state) => state.pomodoro);

  useEffect(() => {
    if (pomodoroStatus === "stop" || pomodoroStatus === "pomodoro") {
      setIsBreakTimeScreen(false);
    }
    if (pomodoroStatus === "shortBreak") {
      setIsBreakTimeScreen(true);
    }
    if (pomodoroStatus === "longBreak") {
      setIsBreakTimeScreen(true);
    }
  }, [shortBreakDuration, longBreakDuration, pomodoroStatus]);

  return (
    isBreakTimeScreen && (
      <div className="inset-0 font-poppins text-slate-50 absolute flex justify-center items-center bg-slate-950/70 z-max">
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-5">
            <p className="text-8xl">{timeRemainingString}</p>
            <p>{`Waktunya istirahat`}</p>
          </div>
        </div>
        <p
          className="transition-all ease-in-out absolute bottom-20 px-6 py-3 rounded-full bg-slate-50/20 hover:bg-slate-50/30 text-xl hover:text-2xl cursor-pointer"
          onClick={() => setIsBreakTimeScreen(false)}
        >
          Keluar
        </p>
      </div>
    )
  );
};
