import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar.js'


class Home extends Component{




  render(){
    return(
      <div className="homePage">
      <NavBar />
      this is the home page

      </div>
    )
  }
}


export default Home;
