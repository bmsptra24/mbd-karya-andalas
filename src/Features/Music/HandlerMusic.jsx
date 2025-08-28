import rainSound from '../../Assets/sound/rain-sound.mp3'
import fireSound from '../../Assets/sound/fireplace-sound.mp3'
import beachSound from '../../Assets/sound/beach-sound.mp3'
import forestSound from '../../Assets/sound/forest-sound.mp3'
import cafeSound from '../../Assets/sound/cafe-sound.mp3'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../Store/Firebase'
import { updateData } from '../../Store/Database'
import { useSelector } from 'react-redux'
import { fetchDataRealtime } from '../../Store/Database'
import { useEffect, useState } from 'react'

export const HandlerMusic = () => {
  const [user] = useAuthState(auth)
  const [musicLog, setMusicLog] = useState('')
  const { playAudio } = useSelector((state) => state.music)

  const startSound = (elementHTML) => {
    elementHTML?.play()
  }
  const pauseAllSound = () => {
    document.querySelectorAll('audio').forEach((el) => el.pause())
  }

  useEffect(() => {
    if (user) {
      fetchDataRealtime(`users/${user.uid}/music/log`, (snapshot) => {
        setMusicLog(snapshot)
      })
    }
  }, [user])

  useEffect(() => {
    if (playAudio === 'stop') {
      return pauseAllSound()
    }
    if (playAudio === 'playLog') {
      pauseAllSound()
      startSound(document.getElementById(musicLog))
      return
    }
    pauseAllSound()
    startSound(document.getElementById(playAudio))
    updateData(['users/' + user.uid + '/music/log'], playAudio)
  }, [playAudio, musicLog])

  return (
    <>
      <audio id="rainSound" src={rainSound} loop={true}></audio>
      <audio id="fireSound" src={fireSound} loop={true}></audio>
      <audio id="beachSound" src={beachSound} loop={true}></audio>
      <audio id="forestSound" src={forestSound} loop={true}></audio>
      <audio id="cafeSound" src={cafeSound} loop={true}></audio>
    </>
  )
}
