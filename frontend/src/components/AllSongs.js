import React, { Component } from "react";
import NavBar from './NavBar.js'
import AllSongsSearchForm from "./AllSongsSearchForm.js";
import DisplayRatings from './DisplayRatings.js'
import * as songsApi from "../Utils/songsUtils.js";
import * as favoritesApi from "../Utils/favoritesUtils.js"

class AllSongs extends Component {
  constructor() {
    super();
    this.state = {
      allSongs: [],
      switchDisplay: false,
      favorites: ""
    };
  }

  componentDidMount() {
    this.getAllSongs();
    this.getAllFavorites()
  }
//axios call
  getAllSongs = () => {
    return songsApi.fetchAllSongs().then(res => {
      this.setState({
        allSongs: res.data.songs
      });
    });
  };
//axios call
  getAllFavorites = () => {
    return favoritesApi.fetchAllFavorites()
    .then(res => {
      this.setState({
        favorites: res.data.favorites
      })
    })
  }
//boolean to display
  switchDisplayfunction = (value) => {
    this.setState({
      switchDisplay: value
    })
  }
  //display title and image for all songs
  displayAllSongs = () => {
    let favArr = []
    let favorites = this.state.favorites

      for(let i =0; i < favorites.length; i++){
        favArr.push(favorites[i].userslikes.length)

      }

    let reversedSongs = this.state.allSongs.reverse();
    // let favorites = Object.values(this.state.favorites)
    return reversedSongs.map((song, i) => {
      return (
        <div>
          <p>{song.title}</p>
          <img src={song.img_url} alt="" />
          <p>Favorites: {favArr[i]}</p>
        </div>
      );
    });



  };

// displayFavorites = () => {
//   let fav = []
//   let likes = {}
//   let favorites = Object.values(this.state.favorites)
//
// return favorites.map((favorite, i) => {
//     fav.push(favorite.userslikes.length)
//     return(
//       <div>
//         <DisplayRatings favorites={fav[i]}/>
//       </div>
//     )
//
//   })
//
// }

displayPhotosLogic = () => {
  if(!this.state.switchDisplay){
    return this.displayAllSongs()
  }else{
    return null
  }
}

  render() {
    console.log(typeof(this.state.favorites), "in state");
    return (
      <div className="allSongsPage">
        <NavBar />
        AllSongs
        <AllSongsSearchForm switchDisplay={this.switchDisplayfunction} songs={this.state.allSongs} />
        <div className="test">
          {this.displayPhotosLogic()}
      </div>

      </div>
    );
  }
}

export default AllSongs;
