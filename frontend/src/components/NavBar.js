import React, {Component} from 'react';
import {Link} from 'react-router-dom'


class NavBar extends Component{





  render(){
    return(
      <div className="navBarPage">
      <h1>EarWorm Report</h1>
      <Link to={"/"}>Home</Link>
      <Link to={"/songs"}>All Songs</Link>
      <Link to={"/songs/bypop"}>By Popularity</Link>
      <Link to={"/songs/bygenre"}>By Genre</Link>
      <Link to={"/profile"}>My Profile</Link>
      </div>
    )
  }
}

export default NavBar
