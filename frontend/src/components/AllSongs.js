// Was unable to favoite a song. Please add this functionality.
//was unable to add a comment. Page refreshed on enter. 

import React, { Component } from "react";
import {Link} from 'react-router-dom';
import NavBar from "./NavBar.js";
import AllSongsSearchForm from "./AllSongsSearchForm.js";
import CreateCommentForSong from "./CreateCommentForSong.js"
import DisplayRatings from "./DisplayRatings.js";
import * as songsApi from "../Utils/songsUtils.js";
import * as favoritesApi from "../Utils/favoritesUtils.js";
import * as commentsApi from "../Utils/commentsUtils.js";
import "../css/AllSongs.css";

class AllSongs extends Component {
  constructor() {
    super();
    this.state = {
      allSongs: [],
      switchDisplay: false,
      favorites: "",
      comments: [],
      favoriteButtonClicked: false,

    };
  }

  componentDidMount() {
    this.getAllSongs();
    this.getAllFavorites();
    this.getAllComments();
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
    return commentsApi.fetchAllComments().then(res => {
      this.setState({
        comments: res.data.comments
      });
    });
  };
  //boolean to display
  switchDisplayfunction = value => {
    this.setState({
      switchDisplay: value
    });
  };
//displays users comments and links to users profile
  displayUsersComments = id => {
    let comments = this.state.comments;
    return comments.map((comment, i) => {
      if (comment.id === id) {
        return (
          <div>
            <p>
              comment {i + 1}:{comment.comments}
            </p>
            <Link to={`/profile/${comment.users_id}`}><p>username: {comment.username}</p></Link>
          </div>
        );
      }
    });
  };

  displayFavorites = id => {
    let favorites = this.state.favorites;
    let favArr = [];
    //loop for getting out favorites out of favorites axios call
    for (let i = 0; i < favorites.length; i++) {
      favArr.push(favorites[i].userslikes.length);
      if (id === favorites[i].id) {
        return (
          <div>
            <p>favorites: {favArr[i]}</p>
          </div>
        );
      }
    }
  };





  favoriteSelectionButton = (id) => {

    if(!this.state.favoriteButtonClicked){
    return(
      <div>
        <button>favorite</button>
      </div>
    )
  }else{
    return(
      <div>
        <button>unFavorite</button>
      </div>
    )
  }
  }

  //display title and image for all songs
  displayAllSongs = () => {
    let reversedSongs = this.state.allSongs.reverse();
    return reversedSongs.map((song, i) => {
      return (
        <div>
          <p>{song.title}</p>
          <img className="songCovers" src={song.img_url} alt="" />
          {this.displayFavorites(song.id)}
          {this.displayUsersComments(song.id)}
          {this.favoriteSelectionButton(song.id)}
          <CreateCommentForSong currentUser={this.props.currentUser} songId={song.id}/>


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
    // console.log(this.props.currentUser, "in state");
    return (
      <div className="allSongsPage">
        <NavBar />
        AllSongs
        <AllSongsSearchForm
          switchDisplay={this.switchDisplayfunction}
          songs={this.state.allSongs}
          displayUsersComments={this.displayUsersComments}
        />
        <div className="test">{this.displayPhotosLogic()}</div>
      </div>
    );
  }
}

export default AllSongs;
