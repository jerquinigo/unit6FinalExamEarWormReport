import React, {Component} from 'react'


class AllSongsSearchForm extends Component{



  searchInput = () => {
    return(
    <form>
      <input type="text" placeholder="Search By Title"/>
      <button type="SUBMIT">Search</button>
    </form>

  )
  }


  render(){
    return(
      <div className="allSongsSearchFormPage">
      {this.searchInput()}
      </div>
    )
  }
}

export default AllSongsSearchForm
