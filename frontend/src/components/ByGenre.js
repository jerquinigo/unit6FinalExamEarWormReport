//I know I mentioned favorites earlier but I just
// noticed that if I toggle the button a ton of times
// and then refresh the number, the count goes up by a lot.

//Genre filter acting odd. There is movement and change
// on change, but also change on the submit. I only want
// movement on the submit. The thing moving is the
// comments...

import React, {Component} from 'react'
import DisplayUsersComments from './DisplayUsersComments.js'
import DisplayFavorites from './DisplayFavorites.js'
import CreateCommentForSong from './CreateCommentForSong.js'
import * as genresApi from '../Utils/genresUtils.js'
import * as songsApi from '../Utils/songsUtils.js'
import * as usersApi from "../Utils/usersUtils.js"

import '../css/ByGenre.css'

//get the option menu to get the id to shoot off at the api call and then display that search result using ternary just like the all songs
class ByGenre extends Component{
constructor(){
  super()
  this.state = {
    allSongs: [],
    allGenres: [],
    allUsers: [],
    genreId: 0,
    genreResults: ""
  }
}

componentDidMount(){
  this.getAllSongs()
  this.getAllGenres()
  this.getAllUsers()

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

getAllUsers = () => {
  return usersApi.fetchAllUsers()
  .then(res => {
    this.setState({
    allUsers: res.data.users
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

// displayAllSongs = () => {
//   let reversedSongs = this.state.allSongs.reverse();
//   return reversedSongs.map((song, i) => {
//     return (
//       <div key={i}>
//         <p>{song.title}</p>
//         <img className="songCovers" src={song.img_url} alt="" />
//           <DisplayFavorites songId={song.id} />
//         <DisplayUsersComments songId={song.id}/>
//         <CreateCommentForSong currentUser={this.props.currentUser} songId={song.id}/>
//       </div>
//     );
//   });
// };

getUsersToMatchSongPosts = (id) => {
  return this.state.allUsers.map((user, i) => {
    if(user.id === id){

      return(
        <div>
          <p>posted by:{user.username}</p>
          </div>
      )
    }
  })

}

displayAllSongs = () => {
  let reversedSongs = this.state.allSongs.reverse();
  return reversedSongs.map((song, i) => {
    return (
      <div className="songsMainDiv" key={i}>
        <div className="songImage">
          <img className="songCovers" src={song.img_url} alt="" />
          {this.getUsersToMatchSongPosts(song.user_id)}
        </div>
        <div className="songContent">
          <div className="pairedTitleAndFavorites">
            <p>{song.title}</p>
            <DisplayFavorites songId={song.id} />
          </div>
          <div className="displayCommentsAndPost">
            <DisplayUsersComments songId={song.id} />
          </div>
            <CreateCommentForSong
              currentUser={this.props.currentUser}
              songId={song.id}
            />
        </div>
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
  return genres.map((genre, i) => {
    return(
      <div className="songsMainDiv" key={i}>
        <div className="songImage">
        <img className="songCovers" src={genre.img_url} alt="" />
          {this.getUsersToMatchSongPosts(genre.user_id)}
        </div>
        <div className="songContent">
          <div className="pairedTitleAndFavorites">
      <p>{genre.title}</p>
        <DisplayFavorites songId={genre.id} />
        </div>
        <div className="displayCommentsAndPost">
      <DisplayUsersComments songId={genre.id}/>
      </div>
      <CreateCommentForSong currentUser={this.props.currentUser} songId={genre.id}/>
      </div>
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
        <div className="innerMainGenreDiv">
      by Genre
      {this.genreSelectForm()}
      {!this.state.genreResults ?this.displayAllSongs():this.displayGenreSearchResults()}
    </div>
      </div>
    )
  }
}

export default ByGenre


//initially load all songs, and then after the drop down menu is changed and submitted, then it will display all the songs for that genre
