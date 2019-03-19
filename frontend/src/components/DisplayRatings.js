import React, {Component} from 'react';



class DisplayRatings extends Component{
  constructor(){
    super()
  }

displayFavorites = () => {
      return(
        <div>
        <p>{this.props.favorites}</p>
        </div>
      )
}


  render(){
    console.log(this.props.favorites, "render ratings")
    return(
      <div>
      {this.displayFavorites()}
      </div>
    )
  }
}

export default DisplayRatings
