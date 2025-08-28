import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { setPlayAudio } from '../Features/Music/Music'
import { useDispatch, useSelector } from 'react-redux'

const Music = () => {
  const { playAudio } = useSelector((state) => state.music)
  const { config } = useSelector((state) => state.database)
  const color = config.color

  const dispatch = useDispatch()

  return (
    <div
      className={`w-72 h-96 rounded-3xl border-2 border-slate-800 absolute bg-${color}-400 z-30 p-4 flex justify-between flex-col lg:left-20 bottom-4 mr-1`}
    >
      <div className="items-center flex justify-between">
        <p className="font-bold text-2xl ml-2">Sound</p>
        {playAudio !== 'stop' ? (
          <BsFillPauseFill
            className="text-3xl cursor-pointer"
            onClick={() => dispatch(setPlayAudio('stop'))}
          />
        ) : (
          <BsFillPlayFill
            className="text-3xl cursor-pointer"
            onClick={() => dispatch(setPlayAudio('playLog'))}
          />
        )}
      </div>
      <div
        className={`rounded-xl bg-${color}-200 mb-3 pb-3 p-3  grow mt-5 flex flex-col gap-2`}
      >
        <p
          className="bg-slate-50 hover:bg-slate-200 hover:shadow-sm transition-all ease-in-out rounded py-1 px-2 cursor-pointer"
          onClick={() => dispatch(setPlayAudio('rainSound'))}
        >
          Rain
        </p>
        <p
          className="bg-slate-50 hover:bg-slate-200 hover:shadow-sm transition-all ease-in-out rounded py-1 px-2 cursor-pointer"
          onClick={() => dispatch(setPlayAudio('fireSound'))}
        >
          Fire
        </p>
        <p
          className="bg-slate-50 hover:bg-slate-200 hover:shadow-sm transition-all ease-in-out rounded py-1 px-2 cursor-pointer"
          onClick={() => dispatch(setPlayAudio('beachSound'))}
        >
          Beach
        </p>
        <p
          className="bg-slate-50 hover:bg-slate-200 hover:shadow-sm transition-all ease-in-out rounded py-1 px-2 cursor-pointer"
          onClick={() => dispatch(setPlayAudio('forestSound'))}
        >
          Forest
        </p>
        <p
          className="bg-slate-50 hover:bg-slate-200 hover:shadow-sm transition-all ease-in-out rounded py-1 px-2 cursor-pointer"
          onClick={() => dispatch(setPlayAudio('cafeSound'))}
        >
          Coffee
        </p>
      </div>
    </div>
  )
}

export default Music
