import { useEffect, useState } from 'react'
import { fetchDataRealtime, updateData } from '../Store/Database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Store/Firebase'
import { AiOutlineClear } from 'react-icons/ai'
import { ImSpinner9 } from 'react-icons/im'
import { BsFillClipboard2Fill, BsCheckLg } from 'react-icons/bs'
import { getAnswer } from '../Store/OpenAI'
import { useSelector, useDispatch } from 'react-redux'
import { setIsGeneratingGpt } from '../Features/Loading/isLoading'
import { HandleEnterPress } from '../Store/HandleEnterPress'
import CloseButton from './CloseButton'
import { LimitData } from '../../Configuration'

const Feynman = () => {
  const [inputFeynman, setInputFeynman] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [log, setLog] = useState([])
  const [user] = useAuthState(auth)
  const { isGeneratingGpt } = useSelector((state) => state.isLoading)
  const dispatch = useDispatch()
  const { config } = useSelector((state) => state.database)
  const color = config.color

  useEffect(() => {
    if (user) {
      fetchDataRealtime(`users/${user.uid}/feynman`, (snapshot) => {
        setLog(
          Object.entries(snapshot)
            .slice(1) // remove first element
            .map((e) => e[1]),
        )
      })
    }
  }, [user])

  const inputHandle = (event) => {
    setInputFeynman(event.target.value)
  }

  const style = {
    message: 'flex justify-end mt-6 ml-12 mr-2',
    aiMessage: 'flex justify-start mt-6 mr-12 ml-2',
  }

  const handleGetAnswer = async () => {
    if (log.length < LimitData.feynman.module) {
      const defaultSystem = {
        content:
          "Your name is Meja Belajar Digital. You are a tool for learning with the Feynman Technique. If at the beginning of the chat the user has not told you about the topic, you should ask what the topic is. If you already know what the topic is, now you should ask the user to explain what he knows about the topic. Then you will critique what the user said and don't forget to make questions to the user about the topic, so that the user can improve his long-term memory (you are like an innocent child and always ask questions about the topic being discussed and don't ask like this 'Do you have any questions?') or if it turns out that the user doesn't know anything about the topic. Repeat this step.",
        role: 'system',
      }
      dispatch(setIsGeneratingGpt(true))
      await getAnswer(
        ['users/' + user.uid + '/feynman'],
        log,
        inputFeynman,
        setInputFeynman,
        defaultSystem,
      )
      setInputFeynman('')
      dispatch(setIsGeneratingGpt(false))
    } else {
      alert('Terlalu banyak percakapan!')
    }
  }

  return (
    <div
      className={`z-10 lg:h-5/6 lg:w-4/5 xl:w-3/5 h-full w-full lg:border-2 border-slate-800 rounded-none lg:rounded-xl lg:bg-${color}-300`}
    >
      <div
        className={`h-full w-full lg:mt-3 lg:ml-3 lg:p-3 lg:border-2 border-slate-800 rounded-none lg:rounded-xl lg:bg-${color}-400`}
      >
        <div className="flex h-full flex-col p-3 bg-slate-50 border-0 lg:border-2 border-slate-800 rounded-none lg:rounded-lg justify-between relative">
          <CloseButton className="right-2 absolute bg-slate-50" />

          <div className="grow overflow-y-scroll">
            {log.length > 0 ? (
              log.map((e, idx) => {
                return (
                  <div
                    key={'message-' + idx}
                    className={
                      e.role === 'user' ? style.message : style.aiMessage
                    }
                  >
                    <div
                      className={`p-3 bg-${color}-200 rounded-lg text-justify justify-end`}
                    >
                      {e.content !== undefined &&
                        e.content?.split('\n').map((e, i) => {
                          return (
                            <div key={i}>
                              {e} <br />
                            </div>
                          )
                        })}
                      {e.content === undefined && (
                        <div>
                          {'Error...404'} <br />
                        </div>
                      )}
                      <div
                        className="transition-all ease-in-out m-1 shadow-sm hover:shadow-lg opacity-0 group-hover:opacity-100 hidden group-hover:block absolute right-0 top-0 bg-slate-200/75 hover:bg-slate-100 p-1.5 rounded-md cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(e.content)
                          setIsCopied(true)
                          setTimeout(() => {
                            setIsCopied(false)
                          }, 3000)
                        }}
                      >
                        {!isCopied && (
                          <BsFillClipboard2Fill className="text-slate-600" />
                        )}
                        {isCopied && <BsCheckLg className="text-slate-600" />}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className={style.aiMessage}>
                <div className={`p-3 bg-${color}-200 rounded-lg`}>
                  Topik apa yang ingin kamu pelajari?
                </div>
              </div>
            )}
            {isGeneratingGpt && (
              <div className={style.aiMessage}>
                <div className={`p-3 bg-${color}-200 rounded-lg flex`}>
                  <ImSpinner9 className="animate-spin" />
                </div>
              </div>
            )}
          </div>
          <div className="flex items-end pt-2">
            <button
              disabled={isGeneratingGpt}
              className={`group transition-all ease-out duration-700 w-14 h-14 rounded-full flex justify-center items-center bg-${color}-300 border-2 border-${color}-500 mr-2 hover:bg-${color}-400 hover:drop-shadow-md ${
                isGeneratingGpt ? 'opacity-60 cursor-not-allowed' : 'hover:w-36'
              }`}
              onClick={() => {
                setLog([])
                updateData(['users/' + user.uid + '/feynman'], [])
                dispatch(setIsGeneratingGpt(false))
              }}
            >
              <AiOutlineClear className="text-3xl" />
              <p
                className={
                  'ml-2 hidden whitespace-nowrap ' +
                  (isGeneratingGpt ? '' : 'group-hover:block')
                }
              >
                Topik baru
              </p>
            </button>
            <textarea
              autoFocus
              className="transition-all ease-in-out grow h-14 border-2 focus:outline-none border-slate-300 rounded-lg p-2 focus:h-24 focus:shadow-md focus:border-slate-400 hover:shadow-md"
              placeholder="search"
              maxLength={LimitData.feynman.body}
              value={inputFeynman}
              onKeyDown={(event) =>
                HandleEnterPress(event, inputFeynman, handleGetAnswer)
              }
              onChange={inputHandle}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feynman
