import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ImSpinner2 } from 'react-icons/im'
import { Configuration, Wallpaper } from '../../Configuration'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import {
  setBlurting,
  setFeynman,
  setFlashCard,
  setNote,
  setSearch,
  setToDoList,
} from '../Features/Home/Home'

export const Background = ({ className }) => {
  const { config } = useSelector((state) => state.database)
  const [loading, setLoading] = useState(true)
  const [start, setStart] = useState(false)
  const dispatch = useDispatch()

  const Card = ({ app, onClick }) => {
    return (
      <div
        className={`bg-${config.color}-200 rounded-xl p-3 flex flex-col justify-center items-center shadow-md hover:bg-${config.color}-300`}
        onClick={onClick}
      >
        <app.icon className="text-5xl text-slate-950" />
        <p className="mt-4">{app.title}</p>
      </div>
    )
  }

  return (
    <>
      {/* bg in landscape */}
      <div
        className={`${
          !loading ? 'invisible' : 'visible'
        } w-full h-full absolute bg-slate-400/50 animate-pulse hidden lg:flex justify-center items-center z-20`}
      >
        <ImSpinner2 className="text-5xl text-slate-50 animate-spin" />
      </div>
      {Wallpaper[config?.background]?.id === 'img' && (
        <img
          loading="lazy"
          src={Wallpaper[config?.background]?.src}
          alt="background"
          className={`${className} ${
            loading ? 'invisible' : 'visible'
          } hidden lg:block object-cover`}
          onLoad={() => setLoading(false)}
        />
      )}
      {Wallpaper[config?.background]?.id === 'video' && (
        <div className="w-full h-full relative">
          {start && <div className="h-full w-full absolute z-10"></div>}
          <div className="w-screen h-screen absolute">
            <ReactPlayer
              url={Wallpaper[config?.background]?.src}
              height={'100%'}
              width={'100%'}
              controls={false}
              playing={true}
              loop={true}
              onReady={() => setLoading(false)}
              onPlay={() => setStart(true)}
              muted
            />
          </div>
        </div>
      )}

      {/* bg in potrait */}
      <div
        className={`h-full w-full bg-${config.color}-50 grid grid-cols-2 gap-3 p-5 lg:hidden pb-20`}
      >
        <Card
          app={Configuration.apps[0]}
          onClick={() => dispatch(setToDoList(true))}
        />
        <Card
          app={Configuration.apps[1]}
          onClick={() => dispatch(setNote(true))}
        />
        <Card
          app={Configuration.apps[2]}
          onClick={() => dispatch(setBlurting(true))}
        />
        <Card
          app={Configuration.apps[3]}
          onClick={() => dispatch(setFlashCard(true))}
        />
        <Card
          app={Configuration.apps[4]}
          onClick={() => dispatch(setFeynman(true))}
        />
        <Card
          app={Configuration.apps[5]}
          onClick={() => dispatch(setSearch(true))}
        />
      </div>
    </>
  )
}
