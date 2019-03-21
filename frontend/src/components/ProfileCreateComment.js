import React, {Component} from 'react';
import * as commentsApi from '../Utils/commentsUtils.js'


class ProfileCreateComment extends Component{
  constructor(){
    super()
    this.state = {
    comment_body: "",
    song_id: 0

    }
  }

  componentDidMount(){

  }

  handleChange = (event) => {
    this.setState({
    [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event, extraData) => {
    const {comment_body} = this.state
    let data = {
      comment_body: comment_body,
      user_id: 1,
      song_id: extraData
    }

    console.log(data)
    return commentsApi.createNewComment(data)

  }
  getSongId = (event) => {
    let song = this.props.songId
    return song
    // this.setState({
    //   song_id: song
    // })
  }

  combinedSubmit = (event) => {
      event.preventDefault()
      this.getSongId()
    this.handleSubmit(event,this.getSongId())
  }

  createCommentForm = () => {
    if(this.props.userId !== 1) return null
    return(
      <div>
      <form>
      <input onChange={this.handleChange} name="comment_body" type="text" placeholder="enter your comment"/>
      <button onClick={this.combinedSubmit} value={this.props.songId} type="SUBMIT">Add Comment</button>
      </form>
      </div>
    )
  }


  render(){
    return(
      <div className="profileCreateCommentPage">
        {this.createCommentForm()}

      </div>
    )
  }
}

export default ProfileCreateComment

//create an axios call just for user1
//use a if else if user is not user One
