import React, { Component } from "react";
import DisplayUsersComments from "./DisplayUsersComments.js";
import * as songsApi from "../Utils/songsUtils.js";
import * as favoritesApi from "../Utils/favoritesUtils.js";

class ByPopularity extends Component {
  constructor() {
    super();
    this.state = {
      allSongs: [],
        favorites: ""
    };
  }

  componentDidMount() {
    this.getAllSongs();
    this.getAllFavorites();
  }
  //axios call for all songs
  getAllSongs = () => {
    return songsApi.fetchAllSongs().then(res => {
      this.setState({
        allSongs: res.data.songs
      });
    });
  };

  getAllFavorites = () => {
  return favoritesApi.fetchAllFavorites().then(res => {
    this.setState({
      favorites: res.data.favorites
    });
  });
  };

//need to figure this out
  displayFavorites = id => {
    let favorites = this.state.favorites;
    let favArr = []
    for (let i = 0; i < favorites.length; i++) {
      favArr.push({[i + 1]: favorites[i].userslikes.length});
    }
    favArr.reverse()

    for(let fav in favArr){
      if(id === fav){
        console.log("test")
      }
    }

    // for (let j = 0; j < favorites.length; j++) {
    //   // if (id === favArr[j]) {
    //     console.log(favArr[j]);
    //     return (
    //       <div>
    //         <p>favorites: {favArr[j]}</p>
    //       </div>
    //     );
    //   // }
    // }
  };

  displayAllSongs = () => {
    let reversedSongs = this.state.allSongs.reverse();
    return reversedSongs.map((song, i) => {
      return (
        <div key={i}>
          <p>{song.title}</p>
          <img className="songCovers" src={song.img_url} alt="" />
          {this.displayFavorites(song.id)}
          <DisplayUsersComments songId={song.id} />
        </div>
      );
    });
  };

  render() {
    return <div className="byPopularityPage">
      THIS ROUTE NEEDS WORK
      {this.displayAllSongs()}
    </div>;
  }
}

export default ByPopularity;
