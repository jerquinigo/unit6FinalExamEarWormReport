// Overall, there was a lot of improvement since the previous 
// review, but there is still a lot of ironing out of
// the functionality that needs to occur.
// Most of the issues have already been mentioned, most
// of them stem from not rerendering on changes.
// Your favoriting is also not staying so there's something
// slightly off about that and it's logic.
// Commenting needs refreshing. Search giving odd results
// and filtering comments or something...
// This is happeing with genre too.
// Populars not coming in correct order.
// Css toggling on profile. Chaning profiles and
// seeing the songs reflect those changes.

import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar.js'
import Home from './components/Home.js';
import AllSongs from './components/AllSongs.js';
import ByPopularity from './components/ByPopularity.js';
import ByGenre from './components/ByGenre.js';
import Profile from './components/Profile.js';
import * as userApi from './Utils/usersUtils.js'

import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      currentUser: ""
    }
  }

componentDidMount(){
  this.getUserAccount(1)
}

getUserAccount = (id) => {
  return userApi.fetchSingleUser(id)
  .then(res => {
    this.setState({
      currentUser: res.data.user
    })
  })

}

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
        <Route exact path={"/"} component={Home}/>
        <Route exact path={"/songs"} render={(props) => <AllSongs {...props} currentUser={this.state.currentUser}/>}/>
        <Route path={"/songs/bypop"} component={ByPopularity}/>
        <Route path={"/songs/bygenre"} render={(props) => <ByGenre {...props} currentUser={this.state.currentUser}/>}/>
        <Route path={"/profile"} render={(props) => <Profile {...props} currentUser={this.state.currentUser}/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
