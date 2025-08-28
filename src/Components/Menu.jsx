import { useDispatch } from 'react-redux'
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
  setHelp,
} from '../Features/Home/Home'
import {
  FaClipboardList,
  FaChalkboardTeacher,
  FaRegStickyNote,
} from 'react-icons/fa'
import { BsFire, BsCardHeading, BsQuestionLg } from 'react-icons/bs'

const Menu = () => {
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
    dispatch(setHelp(false))
  }

  const Icon = ({ Icon, describe, onClick }) => {
    return (
      <div
        className="transition-all ease-in-out w-min h-min hover:bg-slate-50/30 p-5 rounded-lg cursor-pointer flex justify-center items-center flex-col"
        onClick={onClick}
      >
        <div className="select-none bg-slate-50 p-3 rounded-full flex justify-center items-center flex-col">
          <Icon className="text-3xl" />
        </div>
        <p className="text-sm text-center mt-1">{`${describe}`}</p>
      </div>
    )
  }

  return (
    <div className="w-96 z-20 h-80 bg-slate-300/70 backdrop-blur-sm absolute p-1 left-20 top-4 rounded-3xl shadow-2xl grid border flex-wrap grid-cols-3 items-center justify-items-center">
      <Icon
        Icon={FaClipboardList}
        describe={'Todolist'}
        onClick={() => {
          hideAllComponents()
          dispatch(setToDoList(true))
        }}
      />
      <Icon
        Icon={FaRegStickyNote}
        describe={'Note'}
        onClick={() => {
          hideAllComponents()
          dispatch(setNote(true))
        }}
      />
      <Icon
        Icon={BsFire}
        describe={'Blurting'}
        onClick={() => {
          hideAllComponents()
          dispatch(setBlurting(true))
        }}
      />
      <Icon
        Icon={BsCardHeading}
        describe={'Flashcard'}
        onClick={() => {
          hideAllComponents()
          dispatch(setFlashCard(true))
        }}
      />
      <Icon
        Icon={FaChalkboardTeacher}
        describe={'Feynman'}
        onClick={() => {
          hideAllComponents()
          dispatch(setFeynman(true))
        }}
      />
      <Icon
        Icon={BsQuestionLg}
        describe={'Help'}
        onClick={() => {
          hideAllComponents()
          dispatch(setHelp(true))
        }}
      />
    </div>
  )
}

export default Menu
