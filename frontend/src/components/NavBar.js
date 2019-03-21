import React, {Component} from 'react';
import {Link} from 'react-router-dom'


class NavBar extends Component{





  render(){
    return(
      <div className="navBarPage">
      <h1 className="headerNav">EarWorm Report</h1>
      <div className="linksDiv">
      <Link className="navLink" to={"/"}>Home</Link>
      <Link className="navLink" to={"/songs"}>All Songs</Link>
      <Link className="navLink" to={"/songs/bypop"}>By Popularity</Link>
      <Link className="navLink" to={"/songs/bygenre"}>By Genre</Link>
      <Link className="navLink" to={"/profile"}>My Profile</Link>
      </div>
      </div>
    )
  }
}

export default NavBar
