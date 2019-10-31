import React, { Component } from 'react';
import like2hollow from '../img/like2hollow.png'
import like2full from '../img/like2full.png'
import { connect } from 'react-redux';
import { addToFavourites, removeFavourite } from '../../store/actions/favouriteActions'

import './LikeButton.css'


class LikeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLiked: false
    }
  }

  buttonClick(data) {

    if ((this.props.favourites.favourites.filter(fav=> fav._id === data))[0]) {
      this.props.removeFavourite(data, this.props.profile[0]._id)
    }
    else {
      this.props.addToFavourites(data, this.props.profile[0]._id)
    }
  }


  render() {
    let itinerary = this.props.props
    let favourites = this.props.favourites.favourites

    const LikeDisp = (<img className="LikeButton like" onClick={() => this.buttonClick(itinerary._id)} src={like2full} style={{ height: '20px' }} alt="LikeFull" key={itinerary._id} />)
    const NoLikeDisp = (<img className="LikeButton dislike" onClick={() => this.buttonClick(itinerary._id)} src={like2hollow} style={{ height: '20px' }} alt="LikeHollow" key={itinerary._id} />)


    const isLike = favourites.filter(favo => {
      if (favo._id === itinerary._id)
        return true
    })
    
    return (

      <div className='LikeButtonCont'>
        {isLike[0] ?
          LikeDisp : NoLikeDisp
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    itineraries: state.itineraries,
    profile: state.profile.profile,
    favourites: state.favourites
  }
}


export default connect(mapStateToProps, { addToFavourites, removeFavourite })(LikeButton);