import { fetchDataRealtime, getAllDataRank } from '../Store/Database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Store/Firebase'
import { useEffect, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import TextareaAutosize from 'react-textarea-autosize'
import CloseButton from './CloseButton'
import { useSelector } from 'react-redux'
import { ImSpinner2 } from 'react-icons/im'
import { LimitData } from '../../Configuration'

const Rank = () => {
  const [user] = useAuthState(auth)
  const [lastOpen, setLastOpen] = useState(0)
  const [data, setData] = useState([])
  const [rank, setRank] = useState([])
  const [isListClicked, setIsListClicked] = useState(false)

  const menu = ['History', 'Rank']

  const { config } = useSelector((state) => state.database)
  const color = config.color

  // get menu from database
  useEffect(() => {
    if (user) {
      fetchDataRealtime(`rank`, (snapshot) => {
        const mappedData = Object.entries(snapshot).map((e) => e)
        const filteredData = mappedData.filter(
          (data) => data[1]?.user?.uid === user.uid,
        )
        setData(filteredData)
      })
    }
  }, [user])

  useEffect(() => {
    getAllDataRank().then((datas) => setRank(datas))
  }, [])

  console.log({ data })
  return (
    <>
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
                (isListClicked === true
                  ? 'visible lg:visible'
                  : 'hidden lg:visible')
              }
            >
              <div className="hover:overflow-y-scroll overflow-hidden mr-3 lg:mr-0 h-full lg:h-auto mb-0 lg:mb-1">
                {menu.map((title, idx) => {
                  return (
                    <div
                      key={'menu-' + idx}
                      className={`${
                        idx === lastOpen
                          ? `bg-slate-50 border-2 border-${color}-300 drop-shadow-lg`
                          : `bg-slate-200 border-2 border-${color}-50 hover:border-slate-300 hover:bg-slate-300`
                      } px-2 py-1 rounded-lg mb-1`}
                      style={({ cursor: 'pointer' }, { minHeight: '35px' })}
                      onClick={() => {
                        setLastOpen(idx)
                        setIsListClicked((prev) => !prev)
                      }}
                    >
                      <div
                        style={{ cursor: 'pointer' }}
                        className="user-select-none"
                      >
                        {title}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="rounded-none lg:rounded-lg lg:border-2 border-slate-800 bg-slate-50 ml-0 lg:ml-2 p-3 pt-2 grow">
              {lastOpen >= 0 ? (
                <div className="flex flex-col justify-between w-full h-full">
                  <div className="flex justify-between mb-3 pb-1 border-b-2">
                    <div>
                      <div className="visible lg:hidden text-xl hover:text-slate-400">
                        <RxHamburgerMenu
                          onClick={() => setIsListClicked((prev) => !prev)}
                        />
                      </div>
                    </div>
                    <div className="relative flex gap-4" title="Delete note">
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
                    disabled
                    value={menu[lastOpen]}
                  />

                  <div className="grow flex flex-col gap-1 overflow-hidden hover:overflow-y-scroll">
                    <table>
                      <thead>
                        <tr>
                          {lastOpen === 0 && (
                            <>
                              <th className="text-left">Topik</th>
                              <th className="text-left">Tanggal</th>
                              <th className="text-left">Nilai</th>
                            </>
                          )}

                          {lastOpen === 1 && (
                            <>
                              <th className="text-left">Nama</th>
                              <th className="text-left">Score</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {lastOpen === 0 &&
                          data.map((value, index) => (
                            <tr
                              key={'data' + index}
                              className="bg-slate-200 hover:bg-slate-300 transition-all ease-in-out rounded-md"
                            >
                              <td className="p-2">{value[1]?.title}</td>
                              <td>
                                {new Date(value[1]?.date).toLocaleDateString()}
                              </td>
                              <td>{`${value[1]?.score}/${value[1]?.cardsLenght}`}</td>
                            </tr>
                          ))}

                        {lastOpen === 1 &&
                          rank.map((value, index) => (
                            <tr
                              key={'rank' + index}
                              className="bg-slate-200 hover:bg-slate-300 transition-all ease-in-out rounded-md"
                            >
                              <td className="p-2">{value?.name}</td>
                              <td>{value?.cardsLenght}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : menu.length === 0 ? (
                <div className="h-full w-full flex justify-center items-center">
                  <ImSpinner2 className="text-6xl text-slate-400 animate-spin" />
                </div>
              ) : (
                <div className="h-full w-full flex justify-center items-center">
                  <button
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

export default Rank
