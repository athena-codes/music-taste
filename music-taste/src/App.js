import React, { useState } from 'react'
import MusicStreamingData from './components/MusicStreamingData'
import './App.css'

const App = () => {
  const [musicData, setMusicData] = useState(null)

  const handleFileRead = data => {
    setMusicData(data)
  }

  return (
    <div className='app'>
      <h1 className='h1' data-text='Music Taste'>
        Music Taste
      </h1>
      <MusicStreamingData onFileRead={handleFileRead} />
    </div>
  )
}

export default App
