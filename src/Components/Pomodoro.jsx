import { updateData } from '../Store/Database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Store/Firebase'
import { useSelector, useDispatch } from 'react-redux'
import { setPomodoroStatus } from '../Features/Pomodoro/Pomodoro'
import { BsClock, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GrPowerReset } from 'react-icons/gr'

const Pomodoro = () => {
  const [user] = useAuthState(auth)
  const {
    pomodoroStatus,
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    timeRemainingString,
  } = useSelector((state) => state.pomodoro)
  const { config } = useSelector((state) => state.database)
  const color = config.color

  const dispatch = useDispatch()

  return (
    <div
      className={`z-20 w-72 h-96 rounded-3xl border-2 border-slate-800 absolute bg-${color}-400 p-4 flex justify-between flex-col lg:left-20 bottom-4 mr-1`}
    >
      <div className="items-center flex justify-between">
        <p className="font-bold text-2xl ml-2">Pomodoro</p>
        <GrPowerReset
          className="transition-all ease-in-out cursor-pointer text-3xl rounded-3xl bg-slate-50 p-1 hover:bg-slate-300"
          title="Reset Timer"
          onClick={() => dispatch(setPomodoroStatus('stop'))}
        />
      </div>
      <div
        className={`grow mt-3 h-75 w-full bg-${color}-200 rounded-xl mb-4 pb-3 flex flex-col justify-between`}
      >
        <div className="w-full px-4 pt-3">
          <p className="flex justify-between">
            Pomodoro duration
            {pomodoroStatus !== 'pomodoro' ? (
              <button
                title="Start pomodoro"
                disabled={pomodoroStatus === 'pomodoro'}
                className="bg-transparent border-0"
                onClick={() => {
                  dispatch(setPomodoroStatus('pomodoro'))
                }}
              >
                <BsFillPlayFill className="text-3xl" />
              </button>
            ) : (
              <button
                title="Stop pomodoro"
                className="bg-transparent border-0 "
                onClick={() => dispatch(setPomodoroStatus('pause'))}
              >
                <BsFillPauseFill className="text-3xl" />
              </button>
            )}
          </p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className={`rounded border-2 focus:outline-none focus:border-${color}-300 focus:shadow-md w-full px-2`}
            value={pomodoroDuration}
            onChange={(event) => {
              {
                updateData(
                  ['users/' + user.uid + '/pomodoro/pomodoroDuration'],
                  Number(event.target.value),
                )
              }
            }}
          />
        </div>
        <div className="w-full px-4 pt-3">
          <p className="flex justify-between">
            Short break
            {pomodoroStatus !== 'shortBreak' ? (
              <button
                title="Start short break"
                disabled={pomodoroStatus === 'shortBreak'}
                className="bg-transparent border-0 "
                onClick={() => {
                  dispatch(setPomodoroStatus('shortBreak'))
                }}
              >
                <BsFillPlayFill className="text-3xl" />
              </button>
            ) : (
              // Not work yet
              <button
                title="Stop short break"
                className="bg-transparent border-0 "
                onClick={() => console.log('ResetTimer()')} // reset the timer
              >
                <BsFillPauseFill
                  className="text-3xl"
                  onClick={() => dispatch(setPomodoroStatus('pause'))}
                />
              </button>
            )}
          </p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className={`rounded border-2 focus:outline-none focus:border-${color}-300 focus:shadow-md w-full px-2`}
            value={shortBreakDuration}
            onChange={(event) => {
              updateData(
                ['users/' + user.uid + '/pomodoro/shortBreak'],
                Number(event.target.value),
              )
            }}
          />
        </div>
        <div className="w-full px-4 pt-3">
          <p className="flex justify-between">
            Long break
            {pomodoroStatus !== 'longBreak' ? (
              <button
                title="Start long break"
                disabled={pomodoroStatus === 'longBreak'}
                className="bg-transparent border-0 "
                onClick={() => {
                  dispatch(setPomodoroStatus('longBreak'))
                }}
              >
                <BsFillPlayFill className="text-3xl" />
              </button>
            ) : (
              <button
                title="Stop long break"
                className="bg-transparent border-0 "
                onClick={() => dispatch(setPomodoroStatus('pause'))}
              >
                <BsFillPauseFill className="text-3xl" />
              </button>
            )}
          </p>
          <input
            type="number"
            name="pomodoro-duration"
            id="pomodoro-duration"
            className={`rounded border-2 focus:outline-none focus:border-${color}-300 focus:shadow-md w-full px-2`}
            value={longBreakDuration}
            onChange={(event) => {
              updateData(
                ['users/' + user.uid + '/pomodoro/longBreak'],
                Number(event.target.value),
              )
            }}
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <BsClock className="mr-2" />
        <p className="">{timeRemainingString}</p>
      </div>
    </div>
  )
}

export default Pomodoro
