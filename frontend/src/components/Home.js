import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import '../css/Home.css'


class Home extends Component{




  render(){
    return(
      <div className="homePage">
        <div className="innerHomePageDiv">
      <h1 className="homePageText">this is the home page</h1>
      </div>
      </div>
    )
  }
}


export default Home;
