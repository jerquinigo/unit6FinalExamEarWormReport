import React, { Component } from "react";
import NavBar from "./NavBar.js";
import AllSongsSearchForm from "./AllSongsSearchForm.js";
import DisplayRatings from "./DisplayRatings.js";
import * as songsApi from "../Utils/songsUtils.js";
import * as favoritesApi from "../Utils/favoritesUtils.js";
import * as commentsApi from "../Utils/commentsUtils.js"
import "../css/AllSongs.css";

class AllSongs extends Component {
  constructor() {
    super();
    this.state = {
      allSongs: [],
      switchDisplay: false,
      favorites: "",
      comments: [],
      favoriteButtonClicked: false
    };
  }

  componentDidMount() {
    this.getAllSongs();
    this.getAllFavorites();
    this.getAllComments()

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
    return favoritesApi.fetchAllFavorites().then(res => {
      this.setState({
        favorites: res.data.favorites
      });
    });
  };
//axios call
  getAllComments = () => {
    return commentsApi.fetchAllComments()
    .then(res => {
      this.setState({
        comments: res.data.comments
      })
    })
  }
  //boolean to display
  switchDisplayfunction = value => {
    this.setState({
      switchDisplay: value
    });
  };

displayUsersComments = (id) => {
  let comments = this.state.comments;

  return comments.map(comment => {

    if(comment.id === id){
      return(
        <div>
          <p>{comment.comments}</p>
          <p>{comment.username}</p>
        </div>
      )
    }
  })
  }


  // displayUserNames = (id) => {
  //
  // }




  //display title and image for all songs
  displayAllSongs = () => {
    let favArr = [];
    let commentsObj = {}
    let usernameObj = {}
    let favorites = this.state.favorites;
    let comments = this.state.comments;


    //loop for getting the username out of comments
    for(let k=0; k < comments.length; k++){
      usernameObj[k] =comments[k].username
    }
    //loop for getting out favorites out of favorites axios call
    for (let i = 0; i < favorites.length; i++) {
      favArr.push(favorites[i].userslikes.length);
    }
    let username = Object.values(usernameObj)
    let commentsUsers = Object.values(commentsObj)
    let reversedSongs = this.state.allSongs.reverse();
    return reversedSongs.map((song, i) => {

      return (
        <div>
          <p>{song.title}</p>
          <img className="songCovers" src={song.img_url} alt="" />
          <p>Favorites: {favArr[i]}</p>
          <p>{username[i]}</p>
          {this.displayUsersComments(song.id)}
          {this.state.favoriteButtonClicked ? <button value={song.id}>Favorite</button>: <button value={song.id}>unFavorite</button>}

        </div>
      );
    });
  };
  //toggle for the search feature to display one image
  displayPhotosLogic = () => {
    if (!this.state.switchDisplay) {
      return this.displayAllSongs();
    } else {
      return null;
    }
  };

  render() {
    console.log(this.state.comments, "in state");
    return (
      <div className="allSongsPage">
        <NavBar />
        AllSongs
        <AllSongsSearchForm
          switchDisplay={this.switchDisplayfunction}
          songs={this.state.allSongs}
        />
        <div className="test">{this.displayPhotosLogic()}</div>
      </div>
    );
  }
}

export default AllSongs;
