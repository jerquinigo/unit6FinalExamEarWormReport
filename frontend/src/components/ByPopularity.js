import React, { Component } from "react";
import DisplayUsersComments from "./DisplayUsersComments.js";
import * as songsApi from "../Utils/songsUtils.js";
import * as favoritesApi from "../Utils/favoritesUtils.js";
import DisplayFavorites from "./DisplayFavorites.js"
import DisplayFavoritesForPopularity from "./DisplayFavoritesForPopularity.js"
import CreateCommentForSong from "./CreateCommentForSong.js"
import * as usersApi from "../Utils/usersUtils.js"
import '../css/ByPopularity.css'
class ByPopularity extends Component {
  constructor() {
    super();
    this.state = {
      allSongs: [],
        favorites: "",
        allUsers: []
    };
  }

  componentDidMount() {
    this.getAllSongs();
    this.getAllFavorites();
    this.getAllUsers();

  }
  //axios call for all songs
  getAllSongs = () => {
    return songsApi.fetchAllSongs().then(res => {
      this.setState({
        allSongs: res.data.songs
      });
    });
  };
//axios call to get all favorites
  getAllFavorites = () => {
  return favoritesApi.fetchAllFavorites().then(res => {
    this.setState({
      favorites: res.data.favorites
    });
  });
  };
//axios call to get all users
  getAllUsers = () => {
    return usersApi.fetchAllUsers()
    .then(res => {
      this.setState({
      allUsers: res.data.users
      })
    })
  }

  // getAllFavoritesForSingleUser = () => {
  //   return favoritesApi.fetchAllFavoritesForSingleUser(1)
  //   .then(res => {
  //     debugger
  //   })
  // }

//need to figure this out
  // displayFavorites = id => {
  //   let favorites = this.state.favorites;
  //   let favArr = []
  //   for (let i = 0; i < favorites.length; i++) {
  //     favArr.push({[i + 1]: favorites[i].userslikes.length});
  //   }
  //   favArr.reverse()
  //
  //   for(let fav in favArr){
  //     if(id === fav){
  //       console.log("test")
  //     }
  //   }
  //
  //
  //
  //
  //   // for (let j = 0; j < favorites.length; j++) {
  //   //   // if (id === favArr[j]) {
  //   //     console.log(favArr[j]);
  //   //     return (
  //   //       <div>
  //   //         <p>favorites: {favArr[j]}</p>
  //   //       </div>
  //   //     );
  //   //   // }
  //   // }
  // };

  // displayAllSongs = () => {
  //   let reversedSongs = this.state.allSongs.reverse();
  //   return reversedSongs.map((song, i) => {
  //     return (
  //       <div key={i}>
  //         <p>{song.title}</p>
  //         <img className="songCovers" src={song.img_url} alt="" />
  //         {this.displayFavorites(song.id)}
  //         <DisplayUsersComments songId={song.id} />
  //       </div>
  //     );
  //   });
  // };

  // displayFavoritesForPopularity = (id) => {
  //   if(id)
  // }

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
    let reversedSongs = this.state.allSongs;
    reversedSongs.reverse()
    return reversedSongs.map((song, i) => {

      // if(song.user_id === this.state.allUsers[i].id)

      return (
        <div className="songsMainDiv" key={i}>
          <div className="songImage">
            <img className="songCovers" src={song.img_url} alt="" />
            {this.getUsersToMatchSongPosts(song.user_id)}
          </div>
          <div className="songContent">
            <div className="pairedTitleAndFavorites">
              <p>{song.title}</p>
              <DisplayFavoritesForPopularity songId={song.id} />
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

  render() {
    return <div className="byPopularityPage">
        <div className="innerMainPopularityDiv">
      THIS ROUTE NEEDS WORK
      {this.displayAllSongs()}
      </div>
    </div>
  }
}

export default ByPopularity;
