import React, { Component } from "react";
import DisplayUsersComments from './DisplayUsersComments.js'
import ProfileCreateComment from './ProfileCreateComment.js'
import * as favoritesApi from "../Utils/favoritesUtils.js";
import * as usersApi from "../Utils/usersUtils.js"
import '../css/Profile.css'

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      usersFavorites: [],
      singleUser: "",
      displayPosted: false

    };
  }

  componentDidMount() {
    this.getAllFavoritesForSingleUser(this.selectProfileId());
    this.getSingleUser(this.selectProfileId())
  }

//axios call favorites for single user
  getAllFavoritesForSingleUser = id => {
    return favoritesApi.fetchAllFavoritesForSingleUser(id).then(res => {
      this.setState({
        usersFavorites: res.data.favorites
      });
    });
  };


  getSingleUser = (id) => {
    return usersApi.fetchSingleUser(id)
    .then(res => {
    this.setState({
      singleUser: res.data.user
      })
    })
  }

  displayPostedFavoritesButtons = () => {
    return (
      <div>
        <button>posted</button>
        <button>favorites</button>
      </div>
    )
  };

  displayUsersFavorites = () => {
    return this.state.usersFavorites.map(favorite => {

      return (
        <div>
          <p>{favorite.title}</p>
          <img className="profileImages" src={favorite.img_url} alt="" />
          <DisplayUsersComments songId={favorite.id} />
          <ProfileCreateComment userId={this.state.singleUser.id} songId={favorite.id} />
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
        <h2>{this.state.singleUser.username}</h2>
      </div>
    )
  }



  render() {
    // console.log(this.props, "in the profile page");
    // console.log(this.state.singleUser.username, "in the profile state");
    return (
      <div className="profilePage">
        {this.displaySingleUser()}
        {this.displayPostedFavoritesButtons()}
        {this.displayUsersFavorites()}
        my profile
      </div>
    );
  }
}

export default Profile;

// /profile - AKA "My Profile." The logged-in user's profile. On the top of the screen, in a header tag of your choice, should be the user's username.
// Below this, there should be two buttons next to each other - "Posted" and "Favorites." One or the other should be highlighted (with a distinctive background color) depending on which one is selected. By default, "Posted" should be selected.
// Below this should be a feed with all of the songs the user posted, if "Posted" is selected, or that the user favorited, if "Favorites" is selected. These song items should look and behave as described in the /songs route.
// If "Posted" is selected, above this feed, there should be a form where a user may submit a new song. This form should have text inputs for a song's title and image URL (use Google Images results for image URLs).
// When the form is submitted, submit a POST request to the backend, add it to the Songs table of your database, and ensure that all frontend feeds reflect the new song.
// /profile/:id - Any other user's profile. This route is accessed by clicking on a user's username, and is identical to the /profile route, with one exception - you should not be able to post a new song from another user's profile.
