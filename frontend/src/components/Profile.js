import React, { Component } from "react";
import DisplayUsersComments from './DisplayUsersComments.js'
import ProfileCreateComment from './ProfileCreateComment.js'
import * as favoritesApi from "../Utils/favoritesUtils.js";
import * as usersApi from "../Utils/usersUtils.js"
import * as genresApi from "../Utils/genresUtils.js"
import * as songsApi from "../Utils/songsUtils.js"

import '../css/Profile.css'

//still need to work on the favorites button features

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      usersFavorites: [],
      singleUser: "",
        allUsers: [],
      allGenres : {},
      allSongsForOneUser: [],
      userNotJonieProfile: false,
      hidePostSongForm: false,
      genreId: 0,
      title: "",
      img_url: "",
      displayPosted: true


    };
  }

  componentDidMount() {
    this.getAllFavoritesForSingleUser(this.selectProfileId());
    this.getSingleUser(this.selectProfileId())
    this.getAllGenres()
    this.getAllUsers()
    this.allSongsPostedBySpecificUser(this.selectProfileId())
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

//axios call favorites for single user
  getAllFavoritesForSingleUser = id => {
    return favoritesApi.fetchAllFavoritesForSingleUser(id).then(res => {
      this.setState({
        usersFavorites: res.data.favorites
      });
    });
  };
// axios call to get all genres
  getAllGenres = () => {
    return genresApi.fetchAllGenres()
    .then(res => {
      this.setState({
        allGenres: res.data.genres
      })
    })
  }


  getSingleUser = (id) => {
    return usersApi.fetchSingleUser(id)
    .then(res => {
    this.setState({
      singleUser: res.data.user
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

//all songs posted by one user
  allSongsPostedBySpecificUser = (id) => {
    return songsApi.fetchallSongsPostedBySpecificUser(id)
    .then(res => {
      this.setState({
        allSongsForOneUser: res.data.songs
      })
    })
  }

  togglePostedButton = () => {
    this.setState({
      displayPosted: true,
        hidePostSongForm: false
    })
  }

  toggleFavoritesButton = () => {
    this.setState({
      displayPosted: false,
      hidePostSongForm: false
    })
  }

  // combinedToggleFavoritesButton = () => {
  //   this.toggleFavoritesButton()
  // }

togglePostedButtonForOtherUsers = () => {
  this.setState({
    displayPosted: false,
    hidePostSongForm: true
  })
}

toggleFavoriteButtonForOtherUsers = () => {
  this.setState({
    displayPosted: false,
    hidePostSongForm: true
  })
}

  displayPostedFavoritesButtons = () => {
    if(this.state.singleUser.username === "jonie"){
    return (
      <div>
        <button onClick={() => this.togglePostedButton()}>posted</button>
        <button onClick={this.toggleFavoritesButton}>favorites</button>
      </div>
    )
  } if(this.state.singleUser.username !== "jonie"){
      return(
        <div>
          <button onClick={this.togglePostedButtonForOtherUsers}>posted</button>
          <button onClick={this.toggleFavoritesButton}>favorites</button>
        </div>
      )
    }
  };

  gettingGenreId = (event) => {
    this.setState({
      genreId: event.target.value
    })
  }

  genreInputText = () => {
    let genres = Object.values(this.state.allGenres)
    return genres.map(genre => {

      return(
      <option value={genre.id}>{genre.genre_name}</option>
      )
    })
  }

  displayFormFromPostedButton = () => {


    if(this.state.displayPosted && this.state.singleUser.username === "jonie")
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input className="inputBox" onChange={this.handleChange} name="title" type="text" placeholder="enter title"/>
          <input className="inputBox" onChange={this.handleChange} name="img_url" type="text" placeholder="enter url"/>
          <select className="genreSelect" value={this.state.genreId}
           onChange={this.gettingGenreId}>
           <option>Select Genre</option>
           {this.genreInputText()}
         </select>
         <button className="searchButton" type="SUBMIT">Add Song</button>
        </form>
      </div>
    )
  }

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

displayUsersFavoritesByDefault = () => {
  let usersFavorite = this.state.allSongsForOneUser
  return usersFavorite.map((favorite, i) => {
    return(
      <div className="songsMainDiv" key={i}>
        <div className="songImage">
        <img className="songCovers" src={favorite.img_url} alt="" />
        {this.getUsersToMatchSongPosts(favorite.user_id)}
        </div>
          <div className="songContent">
              <div className="pairedTitleAndFavorites">
        <p>{favorite.title}</p>
          </div>
          <div className="displayCommentsAndPost">
        <DisplayUsersComments songId={favorite.id} />
        </div>
        <ProfileCreateComment userId={this.state.singleUser.id} songId={favorite.id} />
        </div>
      </div>
    )
  })
}

//same as displayAllSongs in songs component
  displayUsersFavorites = () => {
    return this.state.usersFavorites.map((favorite, i) => {

      return (
        <div className="songsMainDiv" key={i}>
          <div className="songImage">
          <img className="songCovers" src={favorite.img_url} alt="" />
          {this.getUsersToMatchSongPosts(favorite.user_id)}
          </div>
            <div className="songContent">
                <div className="pairedTitleAndFavorites">
          <p>{favorite.title}</p>
            </div>
            <div className="displayCommentsAndPost">
          <DisplayUsersComments songId={favorite.id} />
          </div>
          <ProfileCreateComment userId={this.state.singleUser.id} songId={favorite.id} />
          </div>
        </div>
      );
    });
  };

  selectProfileId = () => {
    let profile = this.props.location.pathname;
    if (this.props.location.pathname === "/profile") {
      return 1;
    } else {
      return profile.slice(profile.length - 1);
    }
  };

  displaySingleUser = () => {
    return(
      <div>
        <h2 className="displayUserName">{this.state.singleUser.username}</h2>
      </div>
    )
  }

//posts a new song
  handleSubmit = (event) => {
    event.preventDefault()
    let data = {
      title: this.state.title,
      img_url: this.state.img_url,
      user_id: 1,
      genre_id: parseInt(this.state.genreId)
    }

    return songsApi.createNewSong(data)

  }



  render() {
    console.log(this.state.allSongsForOneUser, "the profile")
    // console.log(this.state.allGenres, "in the state again")
    // console.log(this.props, "in the profile page");
    // console.log(this.state.singleUser.username, "in the profile state");
    return (
      <div className="profilePage">
        <div className="innerMainProfileDiv">
        {this.displaySingleUser()}
        {this.displayFormFromPostedButton()}
        {this.displayPostedFavoritesButtons()}
        {!this.state.displayPosted ? this.displayUsersFavorites() : this.displayUsersFavoritesByDefault()}


      </div>
      </div>
    );
  }
}

export default Profile;


// Below this, there should be two buttons next to each other - "Posted" and "Favorites." One or the other should be highlighted (with a distinctive background color) depending on which one is selected. By default, "Posted" should be selected.
// Below this should be a feed with all of the songs the user posted, if "Posted" is selected, or that the user favorited, if "Favorites" is selected. These song items should look and behave as described in the /songs route.
// If "Posted" is selected, above this feed, there should be a form where a user may submit a new song. This form should have text inputs for a song's title and image URL (use Google Images results for image URLs).
// When the form is submitted, submit a POST request to the backend, add it to the Songs table of your database, and ensure that all frontend feeds reflect the new song.
// /profile/:id - Any other user's profile. This route is accessed by clicking on a user's username, and is identical to the /profile route, with one exception - you should not be able to post a new song from another user's profile.
