import {
  FaClipboardList,
  FaChalkboardTeacher,
  FaRegStickyNote,
} from 'react-icons/fa'
import { BsFire, BsCardHeading, BsSoundwave, BsSearch } from 'react-icons/bs'
import { CgMenuGridR } from 'react-icons/cg'
import { AiOutlineSetting } from 'react-icons/ai'
import { RxHamburgerMenu } from 'react-icons/rx'
import '../styles/Icon.css'
import '../styles/Footer.css'
import { useSelector, useDispatch } from 'react-redux'
import {
  setMenu,
  setBlurting,
  setFeynman,
  setFlashCard,
  setMusic,
  setNote,
  setPomodoro,
  setSearch,
  setToDoList,
  setSetting,
  setHelp,
  setRank,
} from '../Features/Home/Home'
import { useState } from 'react'
import { RiMedalLine } from 'react-icons/ri'

const Sidebar = () => {
  const {
    menu,
    toDoList,
    note,
    blurting,
    flashCard,
    feynman,
    music,
    search,
    pomodoro,
    rank,
  } = useSelector((state) => state.home)
  const { timeRemainingString } = useSelector((state) => state.pomodoro)
  const { config } = useSelector((state) => state.database)
  const color = config.color
  const dispatch = useDispatch()

  const hideAllComponents = () => {
    dispatch(setMenu(false))
    dispatch(setToDoList(false))
    dispatch(setNote(false))
    dispatch(setBlurting(false))
    dispatch(setFeynman(false))
    dispatch(setFlashCard(false))
    dispatch(setMusic(false))
    dispatch(setSearch(false))
    dispatch(setPomodoro(false))
    dispatch(setRank(false))
    dispatch(setSetting(false))
    dispatch(setHelp(false))
  }
  const [isBurgerClicked, setIsBurgerClicked] = useState(false)

  const Icon = ({ Icon, isOpened, title }) => {
    return (
      <div
        title={title}
        className={
          'icon text-2xl select-none transition ease-out p-3 hover:bg-slate-300 ' +
          (isOpened && `border-${color}-500 border-4 shadow-md`) || ''
        }
      >
        <Icon />
      </div>
    )
  }

  return (
    <div className="z-40 hidden lg:flex lg:absolute lg:left-0 sidebar-container bg-slate-50 ring-2 ring-slate-800 flex flex-col justify-start items-center h-screen w-16 lg:rounded-tr-3xl lg:rounded-br-3xl">
      {/* large screen */}
      <div className="w-full h-full justify-start items-center hidden lg:flex flex-col py-4">
        <div
          title="Menu"
          onClick={() => {
            dispatch(setMusic(false))
            dispatch(setPomodoro(false))
            dispatch(setMenu(!menu))
          }}
        >
          <Icon Icon={CgMenuGridR} />
        </div>
        <div className="mt-8 flex flex-col justify-center items-center">
          {!config?.taskbar?.todolist &&
            !config?.taskbar?.notes &&
            !config?.taskbar?.blurting &&
            !config?.taskbar?.flashcard &&
            !config?.taskbar?.rank &&
            !config?.taskbar?.feynman && (
              <div className="invisible">
                <Icon Icon={FaClipboardList} isOpened={toDoList} />
              </div>
            )}
          <div
            onClick={() => {
              hideAllComponents()
              dispatch(setToDoList(!toDoList))
            }}
            className={`${config?.taskbar?.todolist ? 'block' : 'hidden'}`}
          >
            <Icon Icon={FaClipboardList} isOpened={toDoList} title="To Do List" />
          </div>
          <div
            onClick={() => {
              hideAllComponents()
              dispatch(setNote(!note))
            }}
            className={`${config?.taskbar?.notes ? 'block' : 'hidden'}`}
          >
            <Icon Icon={FaRegStickyNote} isOpened={note} title="Notes" />
          </div>
          <div
            onClick={() => {
              hideAllComponents()
              dispatch(setBlurting(!blurting))
            }}
            className={`${config?.taskbar?.blurting ? 'block' : 'hidden'}`}
          >
            <Icon Icon={BsFire} isOpened={blurting} title="Blurting" />
          </div>
          <div
            onClick={() => {
              hideAllComponents()
              dispatch(setFlashCard(!flashCard))
            }}
            className={`${config?.taskbar?.flashcard ? 'block' : 'hidden'}`}
          >
            <Icon Icon={BsCardHeading} isOpened={flashCard} title="Flashcard" />
          </div>
          <div
            onClick={() => {
              hideAllComponents()
              dispatch(setFeynman(!feynman))
            }}
            className={`${config?.taskbar?.feynman ? 'block' : 'hidden'}`}
          >
            <Icon Icon={FaChalkboardTeacher} isOpened={feynman} title="Feynman" />
          </div>
          <div
            onClick={() => {
              hideAllComponents()
              dispatch(setRank(!rank))
            }}
            className={`${config?.taskbar?.rank ? 'block' : 'hidden'}`}
          >
            <Icon Icon={RiMedalLine} isOpened={rank} title="Rank" />
          </div>
        </div>
        <div className="mt-auto mb-4 flex flex-col justify-center items-center space-y-4">
          <div
            onClick={() => {
              hideAllComponents()
              dispatch(setSearch(!search))
            }}
          >
            <Icon Icon={BsSearch} isOpened={search} title="Search" />
          </div>
          <div
            onClick={() => {
              dispatch(setMusic(false))
              dispatch(setPomodoro(false))
              dispatch(setMenu(false))
              dispatch(setSetting(true))
            }}
          >
            <Icon Icon={AiOutlineSetting} title="Setting" />
          </div>
          <div
            onClick={() => {
              dispatch(setMusic(!music))
              dispatch(setMenu(false))
              dispatch(setPomodoro(false))
            }}
          >
            <Icon Icon={BsSoundwave} title="Sound" />
          </div>
          <div
            title="Pomodoro"
            className="pomodoro hover:bg-slate-300"
            onClick={() => {
              dispatch(setPomodoro(!pomodoro))
              dispatch(setMenu(false))
              dispatch(setMusic(false))
            }}
          >
            <div className="select-none">{timeRemainingString}</div>
          </div>
        </div>
      </div>

      {/* small screen */}
      <div className="relative h-14 w-full justify-center items-center flex lg:hidden flex-col">
        <div className="icon relative">
          <div
            className={
              isBurgerClicked === true
                ? 'absolute left-full ml-7 bg-slate-100 shadow-lg py-3 rounded-lg w-80 text-center z-50 visible'
                : 'absolute left-full ml-7 bg-slate-100 shadow-lg py-3 rounded-lg w-80 text-center z-50 hidden'
            }
          >
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
              }}
            >
              Home
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
                dispatch(setToDoList(true))
              }}
            >
              Todolist
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
                dispatch(setNote(true))
              }}
            >
              Note
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
                dispatch(setBlurting(true))
              }}
            >
              Blurting
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
                dispatch(setFlashCard(true))
              }}
            >
              Flashcard
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
                dispatch(setFeynman(true))
              }}
            >
              Feynman
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
                dispatch(setRank(true))
              }}
            >
              Rank
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                hideAllComponents()
                setIsBurgerClicked((e) => !e)
                dispatch(setSearch(true))
              }}
            >
              Search
            </p>
            <p
              className="hover:bg-slate-300 p-2 rounded"
              onClick={() => {
                setIsBurgerClicked((e) => !e)
                dispatch(setPomodoro(false))
                dispatch(setMusic(!music))
              }}
            >
              Sound
            </p>
          </div>
          <RxHamburgerMenu
            className="text-2xl select-none"
            onClick={() => {
              setIsBurgerClicked((e) => !e)
              dispatch(setMusic(false))
            }}
          />
        </div>
        <div className="icon absolute bottom-5">
          <div
            className="select-none"
            onClick={() => {
              dispatch(setMusic(false))
              dispatch(setPomodoro(false))
              dispatch(setMenu(false))
              dispatch(setSetting(true))
            }}
          >
            <AiOutlineSetting className="text-3xl" />
          </div>
        </div>
        <div
          className="absolute top-5 pomodoro"
          onClick={() => {
            dispatch(setMusic(false))
            dispatch(setPomodoro(!pomodoro))
          }}
        >
          <div className="select-none text-xl">{timeRemainingString}</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar