import React, {Component} from 'react'
import * as favoritesApi from "../Utils/favoritesUtils.js";

//LOTS of DEAD code.

//songs do not display in order of favorite :-(.



class DisplayFavoritesForPopularity extends Component{
  constructor(){
    super()
    this.state = {
    favorites: "",

    }
  }


  componentDidMount(){
  // this.getAllFavorites();
  this.getAllFavoritesInDesc()
  }


getAllFavoritesInDesc = () => {
  return favoritesApi.getAllFavoritesInDesc()
  .then(res => {
    this.setState({
      favorites: res.data.favorites
    })
  })
}

// getAllFavorites = () => {
//   return favoritesApi.fetchAllFavorites().then(res => {
//
//     this.setState({
//       standardFavorites: res.data.favorites
//     });
//   });
// };
// //testing
// postFavorite = () => {
//    if(this.state.favoriteButtonClicked === true && this.state.song_id !== 0){
//  let data = {
//    user_id: this.state.user_id,
//    song_id: parseInt(this.state.song_id)
//  }
// console.log(data)
//   return favoritesApi.createNewFavorite(data)
//    }
// }
// //deleteing the favorites
// deleteFavorite = (data) => {
//   return favoritesApi.deleteFavorite(data)
// }
//
// uniqueIdFavorites = (number) => {
//   let favValue = 0;
//   // let finalValue;
//   let favorites = this.state.standardFavorites
//   for(let i = 0; i < favorites.length; i++){
//     //can be +1 or ++ will have to test out
//       favValue = favorites[favorites.length -1].uniqueid + number
//   // for(let j = 0; j < favValue.length; j++){
//   //   finalValue = favValue[favValue.length - 1]
//   // }
// }
//   return favValue
//   //put this inside the axios delete
// }
//
// gettingSongId = (event) => {
//   this.setState({
//     song_id: event.target.value,
//     favoriteButtonClicked: true
//   })
// }
//
// gettingSongIdForUnFavorite = (event) => {
//   this.setState({
//     song_id: event.target.value,
//     favoriteButtonClicked: false
//   })
// }
//
// combinedSubmit = async (event) => {
//   event.preventDefault()
//     await this.gettingSongId(event)
//     this.postFavorite()
//
// }
//
// combinedSubmitForUnfavorite = async (event) => {
//   event.preventDefault()
//   await this.gettingSongIdForUnFavorite(event)
//   await this.uniqueIdFavorites()
//   this.deleteFavorite(this.uniqueIdFavorites())
// }

//testing
displayAllFavorites = (id) => {
  let favorites = Object.values(this.state.favorites)
  return favorites.map(favorite => {
    if(id === favorite.id){
      return(
        <div>
          <p>Favorites: {favorite.userslikes}</p>
        </div>
      )
    }

  })
}


// favoriteSelectionButton = (id) => {
//
//   if(!this.state.favoriteButtonClicked){
//   return(
//     <div>
//       <button onClick={this.combinedSubmit} value={this.props.songId}>favorite</button>
//     </div>
//   )
// }else{
//   return(
//     <div>
//       <button onClick={this.combinedSubmitForUnfavorite} value={this.props.songId}>unFavorite</button>
//     </div>
//   )
// }
// }

  // getAllFavorites = () => {
  // return favoritesApi.fetchAllFavorites().then(res => {
  //   this.setState({
  //     favorites: res.data.favorites
  //   });
  // });
  // };




  // displayFavorites = id => {
  //   let favorites = this.state.favorites;
  //   let favArr = [];
  //   for (let i = 0; i < favorites.length; i++) {
  //     favArr.push(favorites[i].userslikes.length);
  //
  //   }
  //   favArr.sort();
  //   favArr.reverse()
  //   console.log(favArr)
  //
  //   for(let j = 0; j < favorites.length; j++){
  //     if(id === favArr[j]){
  //       console.log(favArr[j])
  //       return(
  //         <div>
  //         <p>favorites:{favArr[j]}</p>
  //         </div>
  //       )
  //     }
  //   }

    //loop for getting out favorites out of favorites axios call
    // for (let i = 0; i < favorites.length; i++) {
    //   favArr.push(favorites[i].userslikes.length);
    //   // favArr.reverse()
    //
    //   if (id === favorites[i].id) {
    //     favoriteDisplay= favArr[i]
    //     return (
    //       <div>
    //         <p>favorites: {favoriteDisplay}</p>
    //       </div>
    //     );
    //   }
    // }
  // };



  render(){
    console.log(this.props.songId, "in the test")
    return(
      <div className="theFavoritesForPopularityPage">
        {this.displayAllFavorites(this.props.songId)}

      </div>
    )
  }
}

// {this.displayFavorites(this.props.songId)}

export default DisplayFavoritesForPopularity
