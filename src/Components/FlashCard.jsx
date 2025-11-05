import { fetchDataRealtime, newKey, updateData } from '../Store/Database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Store/Firebase'
import { useEffect, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { BsTrash, BsPlusLg } from 'react-icons/bs'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { RiErrorWarningFill } from 'react-icons/ri'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Confirmation } from './Confirmation'
import CloseButton from './CloseButton'
import { useSelector } from 'react-redux'
import { ImSpinner2 } from 'react-icons/im'
import { LimitData } from '../../Configuration'

const addCardModule = async (user, setCards, key = newKey('flashcard')) => {
  const template = {
    question: '',
    answer: '',
  }
  const keyCard = await newKey('card')

  setCards((e) => {
    return [...e, [keyCard, template]]
  })
  await updateData(
    ['users/' + user.uid + '/flashcard/' + key + '/cards/' + keyCard],
    template,
  )
}

// Function untuk menambah card baru (di dalam modul yang sedang terbuka)
const addCardToCurrentModule = async (user, flashcardKey, setCards) => {
  const template = {
    question: '',
    answer: '',
  }
  const keyCard = await newKey('card')

  setCards((e) => {
    return [...e, [keyCard, template]]
  })
  await updateData(
    [
      'users/' +
        user.uid +
        '/flashcard/' +
        flashcardKey +
        '/cards/' +
        keyCard,
    ],
    template,
  )
}

const Flashcard = () => {
  const [user] = useAuthState(auth)
  const [data, setData] = useState([]) // all data flashcard
  const [title, setTitle] = useState('') // a note was selected
  const [cards, setCards] = useState([]) // a note was selected
  const [lastOpen, setLastOpen] = useState(0)
  const [currentKeyCard, setCurrentKeyCard] = useState([])
  const [isPlay, setIsPlay] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const [isSeeAnswer, setIsSeeAnswer] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [checkPoint, setCheckPoint] = useState(-1)
  const [score, setScore] = useState(0)
  const [isListClicked, setIsListClicked] = useState(false)

  const refTitle = useRef(null)

  const { config } = useSelector((state) => state.database)
  const color = config.color

  const handlerEdit = () => {
    setIsEdit(true)
  }

  const handleDelete = () => {
    if (data.length - 2 === lastOpen) {
      updateData(
        ['users/' + user.uid + '/flashcard/' + 'lastOpen'],
        lastOpen - 1,
      )
    }

    const key = data[lastOpen][0]
    updateData(['users/' + user.uid + '/flashcard/' + key], null)
    setIsDelete(false)
  }

  const handleCreateNewModule = async () => {
    if (data.length < LimitData.flashcard.module) {
      console.log(data.length < LimitData.flashcard.module);
      
      setIsListClicked(false)
      const newFlashcardKey = newKey('flashcard')
      await addCardModule(user, setCards, newFlashcardKey)
      if (lastOpen >= 0) {
        await updateData(
          ['users/' + user.uid + '/flashcard/' + 'lastOpen'],
          data.length - 1,
        )
      } else {
        await updateData(['users/' + user.uid + '/flashcard/' + 'lastOpen'], 0)
      }
      setIsEdit(true)
      handleClickRefTitle()
    } else {
      alert('Terlalu banyak flashcard!')
    }
  }

  useEffect(() => {
    if (user) {
      fetchDataRealtime(`users/${user.uid}/flashcard`, (snapshot) => {
        setData(Object.entries(snapshot).map((e) => e))
      })
    }
  }, [user])

  const changeState = {
    title: (event) => {
      handleUpdate('title', event.target.value)
    },
    question: (event, dbCardKey) => {
      handleCardUpdate(dbCardKey, 'question', event.target.value)
    },
    answer: (event, dbCardKey) => {
      handleCardUpdate(dbCardKey, 'answer', event.target.value)
    },
  }

  const handleUpdate = (key, value) => {
    if (lastOpen !== undefined && data[lastOpen]) {
      setTitle(value)
      updateData(
        ['users/' + user.uid + '/flashcard/' + data[lastOpen][0] + '/' + key],
        value,
      )
    }
  }

  const handleCardUpdate = (dbCardKey, cardProperty, value) => {
    if (lastOpen !== undefined && data[lastOpen]) {
      setCards((prev) => {
        return prev.map((e) => {
          if (e[0] === dbCardKey) {
            e[1][cardProperty] = value
          }
          return e
        })
      })
      updateData(
        [
          'users/' +
            user.uid +
            '/flashcard/' +
            data[lastOpen][0] +
            '/cards/' +
            dbCardKey +
            '/' +
            cardProperty,
        ],
        value,
      )
    }
  }

  const handleSaveScore = (score) => {
    const path = 'rank/'
    const key = newKey(path)

    const value = {
      user: {
        uid: user.uid,
        name: user.displayName,
      },
      score: score,
      flashcardId: data[lastOpen][0],
      date: new Date(),
      title: data[lastOpen][1]?.title,
      cardsLenght: Object.keys(data[lastOpen][1]?.cards || {}).length,
    }
    updateData([path + key], value)
  }

  useEffect(() => {
    if (data.length > 1) {
      setLastOpen(data[data.length - 1][1])
    } else {
      setLastOpen(-1)
    }
  }, [data])

  useEffect(() => {
    if (lastOpen >= 0 && data.length !== 0) {
      data[lastOpen][1].title !== undefined
        ? setTitle(data[lastOpen][1].title)
        : setTitle('')
      if (data[lastOpen][1].cards !== undefined) {
        setCards(Object.entries(data[lastOpen][1].cards))
      } else {
        setCards([])
      }
      setCurrentKeyCard(data[lastOpen][0])
    }
  }, [lastOpen, data])

  const handleClickRefTitle = () => {
    refTitle.current.focus()
  }

  const handleNextQuestion = () => {
    if (checkPoint < cards.length - 1) {
      if (isSeeAnswer) {
        setIsSeeAnswer((e) => !e)
      }
      setCheckPoint((e) => e + 1)
    }

    if (checkPoint >= cards.length - 1) {
      setIsEnd(true)
    }
  }

  const handleAddNewCard = () => {
    if (data[lastOpen] && data[lastOpen][0]) {
        addCardToCurrentModule(user, data[lastOpen][0], setCards)
    }
  }

  return (
    <>
      {isDelete && (
        <Confirmation
          Icon={RiErrorWarningFill}
          title={'Delete Confirmation'}
          body={`Are you sure you want to delete the note?`}
          buttonName={'Delete'}
          trueCallback={handleDelete}
          falseCallback={() => setIsDelete(false)}
          color="red"
        />
      )}
      <div
        className={`z-10 lg:h-5/6 lg:w-4/5 xl:w-3/5 h-full w-full lg:border-2 border-slate-800 rounded-none lg:rounded-xl lg:bg-${color}-300`}
      >
        <div
          className={`h-full w-full lg:mt-3 lg:ml-3 lg:p-3 lg:border-2 border-slate-800 rounded-xl lg:bg-${color}-400`}
        >
          <div className="flex h-full flex-col lg:flex-row overflow-y-scroll lg:overflow-hidden ">
            {!isPlay && (
              <>
                <div
                  className={
                    'bg-slate-50 w-screen lg:w-1/5 py-3 pl-2 lg:pr-2 rounded-xl lg:border-2 border-slate-800 lg:flex flex-col justify-between h-full z-10 lg:h-auto absolute lg:static ' +
                    (isListClicked === true
                      ? 'visible lg:visible'
                      : 'hidden lg:visible')
                  }
                >
                  <div className="hover:overflow-y-scroll overflow-hidden mr-3 lg:mr-0 grow h-9/10 lg:h-auto mb-0 lg:mb-1">
                    {lastOpen >= 0 && data.length > 1
                      ? data.map((e, idx) => {
                          if (idx !== data.length - 1) {
                            return (
                              <div
                                key={'note-' + idx}
                                className={`${
                                  idx === lastOpen
                                    ? `bg-slate-50 border-2 border-${color}-300 drop-shadow-lg`
                                    : `bg-slate-200 border-2 border-${color}-50 hover:border-slate-300 hover:bg-slate-300`
                                } px-2 py-1 rounded-lg mb-1 transition-all ease-in-out`}
                                style={
                                  ({ cursor: 'pointer' }, { minHeight: '35px' })
                                }
                                onClick={() => {
                                  setIsEdit(false)
                                  setIsListClicked((e) => !e)
                                  data.map((e, index) => {
                                    if (idx === index && idx !== data.length) {
                                      updateData(
                                        [
                                          'users/' +
                                            user.uid +
                                            '/flashcard/' +
                                            'lastOpen',
                                        ],
                                        idx,
                                      )
                                    }
                                  })
                                }}
                              >
                                <div
                                  style={{ cursor: 'pointer' }}
                                  className="user-select-none"
                                >
                                  {e[1].title}
                                </div>
                              </div>
                            )
                          }
                        })
                      : data.length === 1
                      ? 'loading'
                      : 'Tidak ada modul...'}
                  </div>

                  <div className="w-full z-40 bottom-20 right-0 absolute lg:static flex justify-end lg:justify-start pr-3 lg:pr-0 h-1/10 lg:h-auto items-center">
                    <div
                      title="Add flashcard"
                      className={`icon transition ease-out bg-${color}-200 hover:bg-${color}-300 border-2 border-${color}-500 text-2xl`}
                      onClick={handleCreateNewModule}
                    >
                      <BsPlusLg />
                    </div>
                  </div>
                </div>

                <div className="relative rounded-lg lg:border-2 border-slate-800 bg-slate-50 ml-0 lg:ml-2 p-3 pt-2 grow flex flex-col">
                  {isEdit && (
                    <>
                      {lastOpen >= 0 ? (
                        <>
                          <div className="flex justify-between mb-3 pb-1 border-b-2">
                            <div
                              title="Delete flashcard"
                              onClick={() => {
                                setIsDelete(true)
                              }}
                            >
                              <BsTrash className="hover:text-red-700 cursor-pointer transition ease-out text-xl" />
                            </div>
                            {!isListClicked && (
                              <div className="visible lg:hidden absolute left-0 right-0 m-auto flex justify-center w-7">
                                <RxHamburgerMenu
                                  className=" text-xl hover:text-slate-400"
                                  onClick={() => {
                                    setIsListClicked((e) => !e)
                                  }}
                                />
                              </div>
                            )}
                            <div className="flex align-items-center gap-4">
                              <CloseButton className="right-2" />
                            </div>
                          </div>
                          <div className="w-full">
                            <TextareaAutosize
                              autoFocus
                              spellCheck={false}
                              className="w-full resize-none overflow-hidden transition ease-in-out bg-slate-50 focus:outline-none focus:border-0 rounded-lg p-3 h-16 text-2xl"
                              placeholder="title"
                              maxLength={LimitData.flashcard.title}
                              rows={5}
                              onChange={changeState.title}
                              value={title}
                              ref={refTitle}
                            />
                          </div>
                          <div className="lg:overflow-y-scroll h-full">
                            {cards !== null &&
                              cards.map((e, idx) => {
                                return (
                                  <div
                                    key={e[0]}
                                    className="flex justify-between w-100 mt-2"
                                  >
                                    <div className="me-2 pt-2 flex">
                                      <p>{idx + 1}</p>
                                    </div>
                                    <textarea
                                      className="form-control p-2 hover:shadow-lg transition ease-out border-slate-300 focus:outline-none focus:border-slate-400 focus:shadow-md border-2 w-50 mr-1 h-44 grow rounded-md"
                                      spellCheck={false}
                                      placeholder="question"
                                      rows={5}
                                      maxLength={LimitData.flashcard.body}
                                      onChange={(event) => {
                                        changeState.question(event, e[0])
                                      }}
                                      value={e[1].question}
                                    ></textarea>
                                    <textarea
                                      className="form-control p-2 hover:shadow-lg transition ease-out border-slate-300 focus:outline-none focus:border-slate-400 focus:shadow-md border-2 w-50 ms-1 h-44 grow rounded-md"
                                      spellCheck={false}
                                      placeholder="answer"
                                      rows={5}
                                      maxLength={LimitData.flashcard.body}
                                      onChange={(event) => {
                                        changeState.answer(event, e[0])
                                      }}
                                      value={e[1].answer}
                                    ></textarea>
                                    <div className='flex flex-col items-center ml-2'>
                                        <BsTrash
                                        className="mt-1 hover:text-red-700 cursor-pointer transition ease-out"
                                        onClick={() => {
                                            updateData(
                                                'users/' +
                                                user.uid +
                                                '/flashcard/' +
                                                data[lastOpen][0] +
                                                '/cards/' +
                                                e[0],
                                                null,
                                            )
                                            setCards((prevCards) =>
                                                prevCards.filter(
                                                    (card) => card[0] !== e[0]
                                                ),
                                            )
                                        }}
                                        />
                                        {/* add plus button here to add new card */}
                                        {idx === cards.length - 1 && (
                                            <BsPlusLg
                                                className="mt-2 hover:text-green-700 cursor-pointer transition ease-out"
                                                onClick={handleAddNewCard}
                                            />
                                        )}
                                    </div>
                                  </div>
                                )
                              })}
                          </div>
                        </>
                      ) : data.length === 0 ? (
                        <div className="h-full w-full flex justify-center items-center">
                          <ImSpinner2 className="text-6xl text-slate-400 animate-spin" />
                        </div>
                      ) : (
                        <div className="h-full w-full flex justify-center items-center">
                          <button
                            onClick={handleCreateNewModule}
                            className={`py-3 px-5 bg-${color}-200 rounded-full hover:bg-${color}-300 transition-all ease-in-out`}
                          >
                            Buat flashcard baru
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {!isEdit && (
                    <>
                      <div className="flex justify-between mb-3 pb-1 border-b-2">
                        <div>
                          <div className="visible lg:hidden text-xl hover:text-slate-400">
                            <RxHamburgerMenu
                              onClick={() => setIsListClicked((prev) => !prev)}
                            />
                          </div>
                        </div>
                        <div
                          className="relative flex gap-4"
                          title="Delete note"
                        >
                          <CloseButton className="right-2" />
                        </div>
                      </div>
                      <div className="w-full h-full flex justify-center items-center flex-col gap-3 pt-10">
                        <p>{title}</p>
                        <button
                          className={`bg-${color}-300 hover:bg-${color}-400 transition-all ease-in-out w-40 h-10 rounded-lg`}
                          onClick={() => {
                            setIsPlay((e) => !e)
                            setCheckPoint(0)
                            setIsStart(true)
                          }}
                        >
                          Mulai Belajar
                        </button>
                        <div className="flex items-center gap-2">
                          <button onClick={handlerEdit}>
                            <HiOutlinePencilAlt className="text-2xl" />
                          </button>
                          <div
                            title="Delete flashcard"
                            onClick={() => {
                              setIsDelete(true)
                            }}
                          >
                            <BsTrash className="hover:text-red-700 cursor-pointer transition ease-out text-xl" />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
            {isPlay && (
              <>
                <div className="flex w-full h-full relative justify-center flex-col items-center rounded-none lg:rounded-xl border-0 lg:border-2 border-slate-800 bg-slate-50 p-3 pt-2">
                  <>
                    {!isStart && (
                      <div
                        className={`transition ease-in-out bg-${color}-300 p-3 rounded-lg px-6 hover:bg-${color}-400 cursor-pointer`}
                        onClick={() => {
                          setCheckPoint(0)
                          setIsStart(true)
                        }}
                      >
                        <p className="font-bold text-3xl">START</p>
                      </div>
                    )}
                    {isStart && !isEnd && (
                      <>
                        <p className="absolute top-3 left-4 font-bold text-slate-500">
                          {checkPoint + 1} |{' '}
                          {isSeeAnswer ? 'Answer' : 'Question'}
                        </p>
                        <div className="grow flex justify-center items-center text-center">
                          {!isSeeAnswer ? (
                            <p className="text-4xl mx-4 mt-2">
                              {cards &&
                                checkPoint !== -1 &&
                                cards[checkPoint][1].question}
                            </p>
                          ) : (
                            <p className="text-4xl mx-4 mt-2">
                              {cards &&
                                checkPoint !== -1 &&
                                cards[checkPoint][1].answer}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-center mb-5 lg:mb-auto gap-3">
                          {!isSeeAnswer && (
                            <button
                              className={`transition ease-in-out bg-${color}-300 py-2 rounded-lg px-3 hover:bg-${color}-400 cursor-pointer`}
                              onClick={() => setIsSeeAnswer((e) => !e)}
                            >
                              Lihat jawaban
                            </button>
                          )}

                          {isSeeAnswer && (
                            <>
                              <button
                                className={`transition ease-in-out bg-red-300 py-2 rounded-lg px-3 hover:bg-red-400 cursor-pointer`}
                                onClick={() => {
                                  handleNextQuestion()
                                }}
                              >
                                Salah
                              </button>
                              <button
                                className={`transition ease-in-out bg-sky-300 py-2 rounded-lg px-3 hover:bg-sky-400 cursor-pointer`}
                                onClick={() => {
                                  const updatedScore = score + 1

                                  setScore(updatedScore)

                                  handleNextQuestion()
                                }}
                              >
                                Benar
                              </button>
                            </>
                          )}
                        </div>
                      </>
                    )}

                    {isStart && isEnd && (
                      <>
                        <div className="grow flex flex-col justify-center items-center">
                          <p>Nilai kamu:</p>
                          <p>
                            {score}/{cards.length}
                          </p>
                        </div>
                        <button
                          className={`transition ease-in-out bg-${color}-300 py-2 rounded-lg px-3 hover:bg-${color}-400 cursor-pointer`}
                          onClick={() => {
                            setIsStart(false)
                            setIsPlay(false)
                            setIsEnd(false)
                            setScore(0)
                            handleSaveScore(score)
                          }}
                        >
                          Tutup
                        </button>
                      </>
                    )}
                  </>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Flashcard