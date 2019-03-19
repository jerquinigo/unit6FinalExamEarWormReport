import React, {Component} from 'react'
import * as favoritesApi from "../Utils/favoritesUtils.js";



class DisplayFavorites extends Component{
  constructor(){
    super()
    this.state = {
    favorites: ""
    }
  }


componentDidMount(){
  this.getAllFavorites();
}

getAllFavorites = () => {
  return favoritesApi.fetchAllFavorites().then(res => {
    this.setState({
      favorites: res.data.favorites
    });
  });
};


displayFavorites = id => {
  let favorites = this.state.favorites;
  let favArr = [];
  //loop for getting out favorites out of favorites axios call
  for (let i = 0; i < favorites.length; i++) {
    favArr.push(favorites[i].userslikes.length);
    if (id === favorites[i].id) {
      return (
        <div>
          <p>favorites: {favArr[i]}</p>
        </div>
      );
    }
  }
};



  render(){
    return(
      <div className="displayFavoritesPage">
      {this.displayFavorites(this.props.songId)}
      </div>
    )
  }
}

export default DisplayFavorites
