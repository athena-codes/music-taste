import React, { useState, useEffect, useMemo } from 'react'
import './MusicStreamingData.css'

const fetchData = async () => {
  //array of promises for fetching data from each file
  const filePromises = Array.from({ length: 9 }, (_, index) =>
    fetch(`/streamingData/StreamingHistory${index}.json`).then(response =>
      response.json()
    )
  )

  const fileData = await Promise.all(filePromises)
  return fileData.flat()
}

const MusicStreamingData = () => {
  const [fileData, setFileData] = useState([])
  const [selectedTable, setSelectedTable] = useState('songs')

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData()
        setFileData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDataAndSetState()
  }, [])

  // memoized function to render music streaming results
  const renderResults = useMemo(() => {
    const counts = {}
    const times = {}

    fileData.forEach(entry => {
      const key = selectedTable === 'songs' ? entry.trackName : entry.artistName
      counts[key] = (counts[key] || 0) + 1
      times[key] = (times[key] || 0) + entry.msPlayed
    })

    // FORMAT TIME
    const formatTime = ms => {
      const seconds = Math.floor(ms / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      return `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${
        seconds % 60
      } seconds`
    }

    const data = Object.keys(counts).map(key => ({
      title: key,
      count: counts[key],
      time: formatTime(times[key])
    }))

    // sort data array based on count in descending order
    data.sort((a, b) => b.count - a.count)

    return (
      <div className='container'>
        <div className='button-group'>
          <button
            className={`table-button ${
              selectedTable === 'songs' ? 'active' : ''
            }`}
            onClick={() => setSelectedTable('songs')}
          >
            Songs
          </button>
          <button
            className={`table-button ${
              selectedTable === 'artists' ? 'active' : ''
            }`}
            onClick={() => setSelectedTable('artists')}
          >
            Artists
          </button>
        </div>

        <table className='song-table'>
          <thead>
            <tr>
              <th>{selectedTable === 'songs' ? 'Title' : 'Artist Name'}</th>
              <th>Count</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.title}</td>
                <td>{entry.count}</td>
                <td>{entry.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }, [fileData, selectedTable])

  return <div>{renderResults}</div>
}
import React, { useState, useEffect, useMemo } from 'react'
import './MusicStreamingData.css'

const fetchData = async () => {
  //array of promises for fetching data from each file
  const filePromises = Array.from({ length: 9 }, (_, index) =>
    fetch(`/streamingData/StreamingHistory${index}.json`).then(response =>
      response.json()
    )
  )

  const fileData = await Promise.all(filePromises)
  return fileData.flat()
}

const MusicStreamingData = () => {
  const [fileData, setFileData] = useState([])
  const [selectedTable, setSelectedTable] = useState('songs')

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData()
        setFileData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchDataAndSetState()
  }, [])

  // memoized function to render music streaming results
  const renderResults = useMemo(() => {
    const counts = {}
    const times = {}

    fileData.forEach(entry => {
      const key = selectedTable === 'songs' ? entry.trackName : entry.artistName
      counts[key] = (counts[key] || 0) + 1
      times[key] = (times[key] || 0) + entry.msPlayed
    })

    // FORMAT TIME
    const formatTime = ms => {
      const seconds = Math.floor(ms / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      return `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${
        seconds % 60
      } seconds`
    }

    const data = Object.keys(counts).map(key => ({
      title: key,
      count: counts[key],
      time: formatTime(times[key])
    }))

    // sort data array based on count in descending order
    data.sort((a, b) => b.count - a.count)

    return (
      <div className='container'>
        <div className='button-group'>
          <button
            className={`table-button ${
              selectedTable === 'songs' ? 'active' : ''
            }`}
            onClick={() => setSelectedTable('songs')}
          >
            Songs
          </button>
          <button
            className={`table-button ${
              selectedTable === 'artists' ? 'active' : ''
            }`}
            onClick={() => setSelectedTable('artists')}
          >
            Artists
          </button>
        </div>

        <table className='song-table'>
          <thead>
            <tr>
              <th>{selectedTable === 'songs' ? 'Title' : 'Artist Name'}</th>
              <th>Count</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.title}</td>
                <td>{entry.count}</td>
                <td>{entry.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }, [fileData, selectedTable])

  return <div>{renderResults}</div>
}

export default MusicStreamingData


export default MusicStreamingData
