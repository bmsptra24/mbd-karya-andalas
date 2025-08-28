import { useAuthState } from 'react-firebase-hooks/auth'
import { fetchDataRealtime } from '../Store/Database'
import { setConfig } from '../Features/Database/Database'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { auth } from './Firebase'

const FetchData = () => {
  const [user] = useAuthState(auth)
  const dispatch = useDispatch()

  // get data from database
  useEffect(() => {
    if (user) {
      fetchDataRealtime(`users/${user.uid}/config`, (snapshot) => {
        dispatch(setConfig(snapshot))
      })
    }
  }, [user, dispatch])

  return <></>
}

export default FetchData
