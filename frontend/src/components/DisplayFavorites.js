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
//stays at zero. need to figure out how to get the number to come up before it gets to the axios call
postFavorite = () => {
   if(this.state.favoriteButtonClicked === true && this.state.song_id !== 0){
 let data = {
   user_id: this.state.user_id,
   song_id: parseInt(this.state.song_id)
 }
console.log(data)
  return favoritesApi.createNewFavorite(data)
   }
}

deleteFavorite = () => {

}

gettingSongId = (event) => {
  this.setState({
    song_id: event.target.value,
    favoriteButtonClicked: true
  })

}

combinedSubmit = async (event) => {
  event.preventDefault()
    await this.gettingSongId(event)
    this.postFavorite()


}

//doing the logic here !
favoriteSelectionButton = (id) => {

  if(!this.state.favoriteButtonClicked){
  return(
    <div>
      <button onClick={this.combinedSubmit} value={this.props.songId}>favorite</button>
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
