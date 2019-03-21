import React, { Component } from "react";
import * as commentsApi from '../Utils/commentsUtils.js'

class CreateCommentForSong extends Component {
  constructor() {
    super();
    this.state = {
    commentBody: "",
    song_id: 0,
    data: []
    }
  }

// componentDidMount(){
// }

  handleChange = (event) => {
    this.setState({
    [event.target.name]: event.target.value
    })
  }



  //axios post
  // postNewComment = () => {
  //   let data = {
  //     comment_body: this.state.commentBody,
  //     user_id: this.filterUser(),
  //     song_id: this.state.song_id
  //   }
  //   return commentsApi.fetchSingleUser(data)
  //
  // }

handleSubmit = (event, extraData) => {
  const {commentBody} = this.state
  let data = {
    comment_body: commentBody,
    user_id: this.filterUser(),
    song_id: extraData
  }

  console.log(data)
  return commentsApi.createNewComment(data)

}

combinedSubmit = (event) => {
    event.preventDefault()
    this.getSongId()
  this.handleSubmit(event,this.getSongId())

}



//get the current songId from the form you are in
getSongId = (event) => {
  let song = this.props.songId
  return song
  // this.setState({
  //   song_id: song
  // })
}

filterUser = () => {
  let finalResults =  ""
let user = Object.values(this.props.currentUser)
let results = user.slice(0,1)
  for(let i = 0; i < results.length; i++){
      finalResults = results[i]
  }
  return finalResults
  }



  createCommentForm = () => {
    return (
      <div className="createCommentForm">
        <form >
          <input onChange={this.handleChange} name="commentBody" type="text" placeholder="enter a comment" />
          <button onClick={this.combinedSubmit} name="song_id"value={this.props.songId} type="SUBMIT">Add Comment</button>
        </form>
      </div>
    );
  };


  render() {

    // console.log(this.state.song_id)
    // console.log(this.props.currentUser, "in the form")
  // console.log(this.props.songId, "song it")
    return (
      <div className="createCommentForSongMainPage">
    {this.createCommentForm()}
    </div>
  )
  }
}

export default CreateCommentForSong;
