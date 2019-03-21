import React, {Component} from 'react'
import DisplayUsersComments from './DisplayUsersComments.js'
import DisplayFavorites from './DisplayFavorites.js'
import CreateCommentForSong from './CreateCommentForSong.js'
import * as genresApi from '../Utils/genresUtils.js'
import * as songsApi from '../Utils/songsUtils.js'

//get the option menu to get the id to shoot off at the api call and then display that search result using ternary just like the all songs
class ByGenre extends Component{
constructor(){
  super()
  this.state = {
    allSongs: [],
    allGenres: []
  }
}

componentDidMount(){
  this.getAllSongs()
  this.getAllGenres()
}


getAllSongs = () => {
  return songsApi.fetchAllSongs().then(res => {
    this.setState({
      allSongs: res.data.songs
    });
  });
};

getAllGenres = () => {
  return genresApi.fetchAllGenres()
  .then(res => {
    this.setState({
      allGenres: res.data.genres
    })
  })
}
//work on this
// getAllSongsBySpecificGenre = (id) => {
//   return.genreApi.fetchAllSongsBySpecificGenre(id)
//   .then(res => {
//     //to put the this.setState
//   })
// }
//the option menu to display all genres
genreInputText = () => {
  let genres = Object.values(this.state.allGenres)
  return genres.map(genre => {

    return(
    <option value={genre.id}>{genre.genre_name}</option>
    )
  })
}

displayAllSongs = () => {
  let reversedSongs = this.state.allSongs.reverse();
  return reversedSongs.map((song, i) => {
    return (
      <div key={i}>
        <p>{song.title}</p>
        <img className="songCovers" src={song.img_url} alt="" />
          <DisplayFavorites songId={song.id} />
        <DisplayUsersComments songId={song.id}/>
        <CreateCommentForSong currentUser={this.props.currentUser} songId={song.id}/>


      </div>
    );
  });
};

// fetchAllSongsBySpecificGenre the axios call to use later
//fetchAllGenres another axios call
//fetchAllSongs another axios call
  render(){
    console.log(this.state.allGenres, "in the genre page")
    return(
      <div className="byGenrePage">
      by Genre
      <select>{this.genreInputText()}</select>
      {this.displayAllSongs()}
      </div>
    )
  }
}

export default ByGenre


//initially load all songs, and then after the drop down menu is changed and submitted, then it will display all the songs for that genre
