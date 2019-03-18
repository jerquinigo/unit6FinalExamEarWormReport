import React, { Component } from "react";
import NavBar from './NavBar.js'
import AllSongsSearchForm from "./AllSongsSearchForm.js";
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

  getAllSongs = () => {
    return songsApi.fetchAllSongs().then(res => {
      this.setState({
        allSongs: res.data.songs
      });
    });
  };

  getAllFavorites = () => {
    return favoritesApi.fetchAllFavorites()
    .then(res => {
      this.setState({
        favorites: res.data.favorites
      })
    })
  }

  switchDisplayfunction = (value) => {
    this.setState({
      switchDisplay: value
    })
  }

  displayAllSongs = () => {
    let reversedSongs = this.state.allSongs.reverse();
    return reversedSongs.map(song => {
      return (
        <div>
          <p>{song.title}</p>
          <img src={song.img_url} alt="" />
        </div>
      );
    });
  };

  render() {
    console.log(this.state.favorites, "in state");
    return (
      <div className="allSongsPage">
        <NavBar />
        AllSongs
        <AllSongsSearchForm switchDisplay={this.switchDisplayfunction} songs={this.state.allSongs} />
        {!this.state.switchDisplay ? this.displayAllSongs(): null}

      </div>
    );
  }
}

export default AllSongs;
