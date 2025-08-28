import { fetchDataRealtime, newKey, updateData } from '../Store/Database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Store/Firebase'
import { useEffect, useRef, useState } from 'react'
import { BsTrash, BsPlusLg } from 'react-icons/bs'
import { RxHamburgerMenu } from 'react-icons/rx'
import { RiErrorWarningFill } from 'react-icons/ri'
import { Confirmation } from './Confirmation'
import TextareaAutosize from 'react-textarea-autosize'
import CloseButton from './CloseButton'
import { useSelector } from 'react-redux'
import { ImSpinner2 } from 'react-icons/im'
import { LimitData } from '../../Configuration'

// add new note
const addNote = async (user) => {
  const template = {
    title: '',
    text: '',
  }
  const key = newKey('notes')
  updateData(['users/' + user.uid + '/notes/' + key], template)
}

const Note = () => {
  const [user] = useAuthState(auth)
  const [data, setData] = useState([]) // all data notes
  const [note, setNote] = useState([]) // a note was selected
  const [lastOpen, setLastOpen] = useState(0)
  const [isListNotesClicked, setIsListNotesClicked] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const refTitle = useRef(null)

  const { config } = useSelector((state) => state.database)
  const color = config.color

  // change state
  const changeState = {
    title: (event) => {
      handleChange('title', event.target.value)
    },
    text: (event) => {
      handleChange('text', event.target.value)
    },
  }

  const handleChange = (key, value) => {
    if (lastOpen !== undefined) {
      setNote((prev) => {
        prev[key] = value
        return prev
      })
      updateData(
        ['users/' + user.uid + '/notes/' + data[lastOpen][0] + '/' + key],
        value,
      )
    }
  }

  const handleCreateNewModule = async () => {
    if (data.length < LimitData.notes.module) {
      setIsListNotesClicked(false)
      addNote(user)
      if (lastOpen >= 0) {
        // jika data masih ada maka:
        await updateData(
          ['users/' + user.uid + '/notes/' + 'lastOpen'],
          data.length - 1,
        )
      } else {
        // jika tidak ada data:
        await updateData(['users/' + user.uid + '/notes/' + 'lastOpen'], 0)
      }
      handleClickRefTitle()
    } else {
      alert('Terlalu banyak note!')
    }
  }

  // get data from database
  useEffect(() => {
    if (user) {
      fetchDataRealtime(`users/${user.uid}/notes`, (snapshot) => {
        setData(Object.entries(snapshot || {}).map((entry) => entry))
      })
    }
  }, [user])

  // set last open data for navigate in first modul
  useEffect(() => {
    if (data.length > 1) {
      setLastOpen(data[data.length - 1][1])
    } else {
      setLastOpen(-1)
    }
  }, [data])

  // set the note
  useEffect(() => {
    if (lastOpen >= 0 && data.length !== 0) {
      setNote(data[lastOpen][1])
    }
  }, [lastOpen])

  const handleClickRefTitle = () => {
    refTitle.current.focus()
  }

  const handleDelete = () => {
    // jika menghapus elemen terakhir dan data > 1
    if (data.length - 2 === lastOpen) {
      updateData(['users/' + user.uid + '/notes/' + 'lastOpen'], lastOpen - 1)
    }

    // remove a note
    const key = data[lastOpen][0]
    updateData(['users/' + user.uid + '/notes/' + key], null)

    setIsDelete(false)
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
          className={`h-full w-full lg:mt-3 lg:ml-3 lg:p-3 lg:border-2 border-slate-800 rounded-none lg:rounded-xl lg:bg-${color}-400`}
        >
          <div className=" flex h-full flex-col lg:flex-row overflow-hidden">
            <div
              className={
                'bg-slate-50 w-screen lg:w-1/5 py-3 pl-2 lg:pr-2 rounded-none lg:rounded-xl lg:border-2 border-slate-800 lg:flex flex-col justify-between h-full z-10 lg:h-auto relative lg:static ' +
                (isListNotesClicked === true
                  ? 'visible lg:visible'
                  : 'hidden lg:visible')
              }
            >
              <div className="hover:overflow-y-scroll overflow-hidden mr-3 lg:mr-0 grow h-full lg:h-auto mb-0 lg:mb-1">
                {lastOpen >= 0
                  ? data.map((e, idx) => {
                      if (idx !== data.length - 1) {
                        return (
                          <div
                            key={'note-' + idx}
                            className={`${
                              idx === lastOpen
                                ? `bg-slate-50 border-2 border-${color}-300 drop-shadow-lg`
                                : `bg-slate-200 border-2 border-${color}-50 hover:border-slate-300 hover:bg-slate-300`
                            } px-2 py-1 rounded-lg mb-1`}
                            style={
                              ({ cursor: 'pointer' }, { minHeight: '35px' })
                            }
                            onClick={() => {
                              setIsListNotesClicked((e) => !e)
                              data.map((e, index) => {
                                if (idx === index && idx !== data.length) {
                                  updateData(
                                    [
                                      'users/' +
                                        user.uid +
                                        '/notes/' +
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
                  : data.length === 0
                  ? 'Loading...'
                  : 'Tidak ada modul...'}
              </div>
              <div className="w-full z-40 bottom-4 absolute lg:static flex justify-end lg:justify-start pr-3 lg:pr-0 h-1/10 lg:h-auto items-center">
                <div
                  title="Add note"
                  className={`icon transition ease-out bg-${color}-200 hover:bg-${color}-300 border-2 border-${color}-500`}
                  onClick={handleCreateNewModule}
                >
                  <BsPlusLg style={{ fontSize: 'x-large' }} />
                </div>
              </div>
            </div>
            <div className="rounded-none lg:rounded-lg lg:border-2 border-slate-800 bg-slate-50 ml-0 lg:ml-2 p-3 pt-2 grow">
              {lastOpen >= 0 ? (
                <div className="flex flex-col justify-between w-full h-full">
                  <div className="flex justify-between mb-3 pb-1 border-b-2">
                    <div>
                      <div
                        className="visible lg:hidden text-xl hover:text-slate-400"
                        onClick={() => {
                          setIsListNotesClicked((e) => !e)
                        }}
                      >
                        <RxHamburgerMenu />
                      </div>
                    </div>
                    <div
                      className="relative flex gap-4"
                      title="Delete note"
                      onClick={() => setIsDelete(true)}
                    >
                      <BsTrash className="hover:text-red-700 cursor-pointer text-xl transition ease-out" />
                      <CloseButton className="right-2" />
                    </div>
                  </div>

                  <TextareaAutosize
                    autoFocus
                    spellCheck={false}
                    className="resize-none transition ease-in-out bg-slate-50 focus:outline-none focus:border-none rounded-lg p-3 h-16 text-2xl"
                    placeholder="title"
                    maxLength={LimitData.notes.title}
                    rows={5}
                    onChange={changeState.title}
                    value={note.title}
                    ref={refTitle}
                  />

                  <textarea
                    className="resize-none transition ease-in-out grow bg-slate-50 focus:outline-none focus:border-none rounded-lg p-3"
                    placeholder="note"
                    spellCheck={false}
                    rows={5}
                    maxLength={LimitData.notes.body}
                    onChange={changeState.text}
                    value={note.text}
                  ></textarea>
                </div>
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
                    Buat catatan baru
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Note
