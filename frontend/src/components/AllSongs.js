import React, { Component } from "react";
import { Link } from "react-router-dom";
import AllSongsSearchForm from "./AllSongsSearchForm.js";
import CreateCommentForSong from "./CreateCommentForSong.js";
import DisplayUsersComments from "./DisplayUsersComments.js";
import DisplayFavorites from "./DisplayFavorites.js";
import * as songsApi from "../Utils/songsUtils.js";
import * as usersApi from "../Utils/usersUtils.js"
// import * as favoritesApi from "../Utils/favoritesUtils.js";
import * as commentsApi from "../Utils/commentsUtils.js";
import "../css/AllSongs.css";

class AllSongs extends Component {
  constructor() {
    super();
    this.state = {
      allSongs: [],
      switchDisplay: false,
      comments: [],
      allUsers: [],
      favoriteButtonClicked: false
    };
  }

  componentDidMount() {
    this.getAllSongs();
    // this.getAllFavorites();
    this.getAllComments();
    this.getAllUsers()
  }

  //axios call
  getAllSongs = () => {
    return songsApi.fetchAllSongs().then(res => {
      this.setState({
        allSongs: res.data.songs
      });
    });
  };

  getAllUsers = () => {
    return usersApi.fetchAllUsers()
    .then(res => {
      this.setState({
      allUsers: res.data.users
      })
    })
  }

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
    let comments = this.state.comments.reverse();
    return comments.map((comment, i) => {
      if (comment.id === id) {
        return (
          <div>
            <p>
              comment {i + 1}:{comment.comments}
            </p>
            <Link to={`/profile/${comment.users_id}`}>
              <p>username: {comment.username}</p>
            </Link>
          </div>
        );
      }
    });
  };

  // displayFavorites = id => {
  //   let favorites = this.state.favorites;
  //   let favArr = [];
  //   //loop for getting out favorites out of favorites axios call
  //   for (let i = 0; i < favorites.length; i++) {
  //     favArr.push(favorites[i].userslikes.length);
  //     if (id === favorites[i].id) {
  //       return (
  //         <div>
  //           <p>favorites: {favArr[i]}</p>
  //         </div>
  //       );
  //     }
  //   }
  // };

  // favoriteSelectionButton = (id) => {
  //
  //   if(!this.state.favoriteButtonClicked){
  //   return(
  //     <div>
  //       <button>favorite</button>
  //     </div>
  //   )
  // }else{
  //   return(
  //     <div>
  //       <button>unFavorite</button>
  //     </div>
  //   )
  // }
  // }
  //to display the users and their respective song
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
  //display title and image for all songs
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
  //toggle for the search feature to display one image
  displayPhotosLogic = () => {
    if (!this.state.switchDisplay) {
      return(
        <div className="allSongsMainDiv">
         {this.displayAllSongs()}
       </div>
       )
    } else {
      return null;
    }
  };

  render() {
    console.log(this.state.allUsers, "all the users in the allsongs")
    // console.log(this.props.currentUser, "in state");
    return (
      <div className="allSongsPage">
        <div className="innerMainSongDiv">
          AllSongs
          <AllSongsSearchForm
            switchDisplay={this.switchDisplayfunction}
            songs={this.state.allSongs}
            displayUsersComments={this.displayUsersComments}
            currentUser={this.props.currentUser}
          />
          <div className="test">{this.displayPhotosLogic()}</div>
        </div>
      </div>
    );
  }
}

export default AllSongs;
