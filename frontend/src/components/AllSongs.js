import React, {Component} from 'react'
import AllSongsSearchForm from './AllSongsSearchForm.js'
import * as songsApi from '../Utils/songsUtils.js'
class AllSongs extends Component{
  constructor(){
    super()
    this.state = {
      allSongs:[],
      songTitles:[]
    }
  }

componentDidMount(){
this.getAllSongs()
}



getAllSongs = () => {
  return songsApi.fetchAllSongs()
  .then(res => {
    this.setState({
      allSongs: res.data.songs
    })
  })
}

displayAllSongs = () => {
let reversedSongs = this.state.allSongs.reverse()
  return reversedSongs.map(song => {
    return(
    <div>
      <p>{song.title}</p>
      <img src={song.img_url} alt="" />
    </div>
  )
  })
}

getTitlesForForm = () => {
  let songTitles = []
  return this.state.allSongs.map(song => {
    songTitles.push(song.title)
  })
  console.log(songTitles, "the song titles")
}





  render(){
console.log(this.state.songTitles)
    // console.log(this.state.allSongs.reverse(), "the props")
    return(
      <div className="allSongsPage">
      AllSongs
      {this.displayAllSongs()}
      {this.getTitlesForForm()}
      </div>
    )
  }
}

export default AllSongs
