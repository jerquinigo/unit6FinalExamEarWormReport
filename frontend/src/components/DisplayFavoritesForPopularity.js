import React, {Component} from 'react'
import * as favoritesApi from "../Utils/favoritesUtils.js";



class DisplayFavoritesForPopularity extends Component{
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
    for (let i = 0; i < favorites.length; i++) {
      favArr.push(favorites[i].userslikes.length);

    }
    favArr.sort();
    favArr.reverse()
    console.log(favArr)

    for(let j = 0; j < favorites.length; j++){
      if(id === favArr[j]){
        console.log(favArr[j])
        return(
          <div>
          <p>favorites: {favArr[j]}</p>
          </div>
        )
      }
    }

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
  };



  render(){
    return(
      <div className="theFavoritesForPopularityPage">
        {this.displayFavorites(this.props.songId)}
      </div>
    )
  }
}


export default DisplayFavoritesForPopularity
