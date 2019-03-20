import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as commentsApi from "../Utils/commentsUtils.js";


class DisplayUsersComments extends Component{
  constructor(){
    super()
    this.state = {
      comments: []
    }
  }


componentDidMount(){
  this.getAllComments();

}

//axios call
getAllComments = () => {
  return commentsApi.fetchAllComments().then(res => {
    this.setState({
      comments: res.data.comments
    });
  });
};


//displays users comments and links to users profile
  displayUsersComments = id => {
    let comments = this.state.comments.reverse();
    return comments.map((comment, i) => {
      if (comment.id === id) {

        return (
          <div key={i}>
            <p>
              comment {i + 1}:{comment.comments}
            </p>
            <Link to={`/profile/${comment.users_id}`}><p>username: {comment.username}</p></Link>
          </div>
        );
      }
    });
  };


  reRender = () => {
    this.setState({
      state: this.state
    })
  }



  render(){
    return(
      <div className= "commentsPage">
      {this.displayUsersComments(this.props.songId)}
      </div>
    )
  }
}

export default DisplayUsersComments
