import React, {Component} from 'react'
import * as favoritesApi from "../Utils/favoritesUtils.js";
import '../css/NavBar.css'



class DisplayFavorites extends Component{
  constructor(){
    super()
    this.state = {
    favorites: "",
    user_id: 1,
    song_id: 0,
    testFav: "",
    favoritesUnique: [],
    favoriteButtonClicked: false
    }
  }
//post request to update the favorites
//delete request to remove the favorite
// deleteFavorite

componentDidMount(){
  this.getAllFavorites();
  this.getAllFavoritesByUniqueId(this.state.user_id)
}
//left off here
//to get the primary id key value
getAllFavoritesByUniqueId = (id) => {
  return favoritesApi.getAllFavoritesByUniqueId(id)
  .then(res => {
// debugger
    this.setState({
      favoritesUnique: res.data.favorites
    })
  })
}

//need to loop through the favoritesUniques to get what i need out for the delete request loop


getAllFavorites = () => {
  return favoritesApi.fetchAllFavorites().then(res => {

    this.setState({
      favorites: res.data.favorites
    });
  });
};
//to get the last number for the axios call
uniqueIdFavorites = (number) => {
  let favValue = 0;
  // let finalValue;
  let favorites = this.state.favoritesUnique
  for(let i = 0; i < favorites.length; i++){
    //can be +1 or ++ will have to test out
      favValue = favorites[favorites.length -1].uniqueid + number
  // for(let j = 0; j < favValue.length; j++){
  //   finalValue = favValue[favValue.length - 1]
  // }
}
  return favValue
  //put this inside the axios delete
}

//hacky way to get favorites to work. LOOK INTO THIS LATER pls
displayFavorites  = (id) => {
  let favorites = this.state.favorites;
  let favArr = [];
  //loop for getting out favorites out of favorites axios call
  for (let i = 0; i < favorites.length; i++) {
    favArr.push(favorites[i].userslikes.length);
    if (id === favorites[i].id) {

      // this.uniqueIdFavorites(favArr[i])
      return (
        <div>
          <p>favorites: {favArr[i]}</p>
        </div>
      );
    }if(this.state.favoriteButtonClicked === true){
      return(
        <div>
            <p>favorites: {favArr[i] + [i]}</p>
        </div>
        )
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
//deleteing the favorites
deleteFavorite = (data) => {
  return favoritesApi.deleteFavorite(data)
}

gettingSongId = (event) => {
  this.setState({
    song_id: event.target.value,
    favoriteButtonClicked: true
  })
}

gettingSongIdForUnFavorite = (event) => {
  this.setState({
    song_id: event.target.value,
    favoriteButtonClicked: false
  })
}

combinedSubmit = async (event) => {
  event.preventDefault()
    await this.gettingSongId(event)
    this.postFavorite()

}

combinedSubmitForUnfavorite = async (event) => {
  event.preventDefault()
  await this.gettingSongIdForUnFavorite(event)
  await this.uniqueIdFavorites()
  this.deleteFavorite(this.uniqueIdFavorites())
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
      <button onClick={this.combinedSubmitForUnfavorite} value={this.props.songId}>unFavorite</button>
    </div>
  )
}
}


  render(){
    // console.log(this.uniqueIdFavorites(), "the function")
    // console.log(this.state.favoritesUnique, "in the dis favs")
    return(
      <div className="displayFavoritesPage">
      {this.displayFavorites(this.props.songId)}
      {this.favoriteSelectionButton()}
      </div>
    )
  }
}

export default DisplayFavorites
