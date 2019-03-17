import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home.js';
import AllSongs from './components/AllSongs.js';
import ByPopularity from './components/ByPopularity.js';
import ByGenre from './components/ByGenre.js';
import Profile from './components/Profile.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
        <Route exact path={"/"} component={Home}/>
        <Route exact path={"/songs"} component={AllSongs}/>
        <Route path={"/songs/bypop"} component={ByPopularity}/>
        <Route path={"/songs/bygenre"} component={ByGenre}/>
        <Route path={"/profile"} component={Profile}/>
        </Switch>
      </div>
    );
  }
}

export default App;
