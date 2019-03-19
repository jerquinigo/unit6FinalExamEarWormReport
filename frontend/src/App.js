// You should have 1 Navbar in here. Don't pass it around
// everywhere.

So I'm a bit concerned about where this is right now.
All songs is coming along but still mising some
crucial functionality.
Good backend.
The rest of the project is not there at all.
I hope as you move forward you think about / consider
what pieces of your code can be broken out into
reusable componenets. There is a LOT of repitition
in this exam. Please don't copy and past all over the place.
Styling is not there and needs improvment.
I like what you're doing with your file structuring.
Please think about renaming Utils to utils to stay consistent.
Keep up the hard work I know that you do and I believe
you will be able to complete, but we do still have a
ways to go.
Let me know if you have questions or concerns. Thanks.

import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
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
        <Switch>
        <Route exact path={"/"} component={Home}/>
        <Route exact path={"/songs"} render={(props) => <AllSongs {...props} currentUser={this.state.currentUser}/>}/>
        <Route path={"/songs/bypop"} component={ByPopularity}/>
        <Route path={"/songs/bygenre"} component={ByGenre}/>
        <Route path={"/profile"} component={Profile}/>
        </Switch>
      </div>
    );
  }
}

export default App;
