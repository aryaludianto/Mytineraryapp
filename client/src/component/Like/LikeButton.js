import React, { Component } from 'react';
import like2hollow from '../img/like2hollow.png'
import like2full from '../img/like2full.png'
import { connect } from 'react-redux';
import { likeItinerary } from '../../store/actions/likeActions'

import './LikeButton.css'


class LikeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLiked: false
    }
  }

  buttonClick(data) {



    console.log(data, this.props.profile[0]._id)
  
  
  }


  render() {
    let itinerary = this.props.props
    let profile = this.props.profile

    const LikeDisp = (<img className="LikeButton like" onClick={() => this.buttonClick(itinerary._id)} src={like2full} style={{ height: '20px' }} alt="LikeFull" key={itinerary._id} />)
    const NoLikeDisp = (<img className="LikeButton dislike" onClick={() => this.buttonClick(itinerary._id)} src={like2hollow} style={{ height: '20px' }} alt="LikeHollow" key={itinerary._id} />)

    const isLike = profile[0].favourite.map(pro => {
      if (pro === itinerary._id)
        return LikeDisp
      else
        return NoLikeDisp
    })


    return (
      <div className='LikeButtonCont'>
        {isLike}
      </div>
    );
  }
}

// export default LikeButton

const mapStateToProps = (state) => {
  return {
    itineraries: state.itineraries,
    profile: state.profile.profile,
  }
}


export default connect(mapStateToProps)(LikeButton);