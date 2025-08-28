import { MdClose } from 'react-icons/md'
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
  setSetting,
  setHelp,
  setRank,
} from '../Features/Home/Home'

const CloseButton = ({ className, autoHide = true }) => {
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
    dispatch(setSetting(false))
    dispatch(setHelp(false))
    dispatch(setRank(false))
  }
  return (
    <MdClose
      onClick={hideAllComponents}
      className={
        'z-40 transition-all ease-in-out cursor-pointer text-2xl text-slate-950 hover:text-red-500 hover:bg-slate-300/70 rounded-lg ' +
        (className ? className : '') +
        (autoHide ? ' hidden lg:block' : '')
      }
    />
  )
}
export default CloseButton
