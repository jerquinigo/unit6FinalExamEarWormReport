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
    allGenres: [],
    genreId: 0,
    genreResults: ""
  }
}

componentDidMount(){
  this.getAllSongs()
  this.getAllGenres()

}

gettingGenreId = (event) => {
this.setState({
    genreId: event.target.value
  })
}

// var resolveAfter2Seconds = function() {
//   console.log("starting slow promise");
//   return new Promise(resolve => {
//     setTimeout(function() {
//       resolve("slow");
//       console.log("slow promise is done");
//     }, 2000);
//   });
// };


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


displaySearchByGenre = () => {
  if(this.state.genreId !== 0){
  return songsApi.fetchAllSongsBySpecificGenre(parseInt(this.state.genreId))
  .then(res => {
    this.setState({
      genreResults: res.data.songs
      })
    })
  }
}

onSubmit = (event) => {
  event.preventDefault()
  this.displaySearchByGenre()
}

genreSelectForm = () => {
  return(
    <div>
      <form onSubmit={this.onSubmit}>
        <select onChange={this.gettingGenreId} value={this.state.genreId}>
          <option>Select Genre</option>
          {this.genreInputText()}
        </select>
        <button type="SUBMIT">Search Genres</button>
      </form>
    </div>
  )
}

displayGenreSearchResults = () => {
  let genres = Object.values(this.state.genreResults)
  genres.reverse()
  return genres.map(genre => {
    return(
      <div>
      <p>{genre.title}</p>
      <img src={genre.img_url} alt="" />
        <DisplayFavorites songId={genre.id} />
      <DisplayUsersComments songId={genre.id}/>
      <CreateCommentForSong currentUser={this.props.currentUser} songId={genre.id}/>
      </div>
    )
  })
}

// fetchAllSongsBySpecificGenre the axios call to use later
//fetchAllGenres another axios call
//fetchAllSongs another axios call
// fetchAllSongsBySpecificGenre
  render(){
    console.log(this.state.genreResults, "in the genre page")
    return(
      <div className="byGenrePage">
      by Genre
      {this.genreSelectForm()}
      {!this.state.genreResults ?this.displayAllSongs():this.displayGenreSearchResults()}

      </div>
    )
  }
}

export default ByGenre


//initially load all songs, and then after the drop down menu is changed and submitted, then it will display all the songs for that genre
