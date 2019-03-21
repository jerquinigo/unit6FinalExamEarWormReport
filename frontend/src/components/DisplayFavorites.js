import React, {Component} from 'react'
import * as favoritesApi from "../Utils/favoritesUtils.js";



class DisplayFavorites extends Component{
  constructor(){
    super()
    this.state = {
    favorites: "",
    user_id: 1,
    song_id: 0,
    favoriteButtonClicked: false
    }
  }
//post request to update the favorites
//delete request to remove the favorite

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

postFavorite = () => {
 let data = {

 }

  return favoritesApi.createNewFavorite(data)
  .then(res => {
    debugger
  })
}

gettingSongId = (event) => {
  this.setState({
    song_id: event.target.value
  })
}

//doing the logic here !
favoriteSelectionButton = (id) => {

  if(!this.state.favoriteButtonClicked){
  return(
    <div>
      <button onClick={this.gettingSongId} value={this.props.songId}>favorite</button>
    </div>
  )
}else{
  return(
    <div>
      <button value={this.props.songId}>unFavorite</button>
    </div>
  )
}
}




  render(){
    console.log(this.state.song_id, "in the dis favs")
    return(
      <div className="displayFavoritesPage">
      {this.displayFavorites(this.props.songId)}
      {this.favoriteSelectionButton()}
      </div>
    )
  }
}

export default DisplayFavorites
