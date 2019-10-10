import React, { Component } from 'react';
import { isLoggedIn } from '../../store/actions/loginActions';
import { connect } from 'react-redux';



class AddItinerary extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null,
      submitReady: false,
      title: '',
      city: '',
      rating: '',
      profileId: '',
      duration: '',
      price: '',
      hashtags: [],
      activities: [{
        name: '',
        address: '',
        img: '',
        time: '',
        cost: '',
        comments: ''
      }],
      formErrors: {
        title: '',
        city: '',
        rating: '',
        profileId: '',
        duration: '',
        price: '',
        hashtags: [],
        activities: [{
          name: '',
          address: '',
          img: '',
          time: '',
          cost: '',
          comments: ''
        }]
      }
    }
  }


  componentDidMount() {
    this.props.isLoggedIn()
  }




  render() {
    const { formErrors } = this.state;


    return (
      <div>
        {this.props.login.isLoggedIn ? (
          <div className='addIti'>
            <h1>Itinerary</h1>
            <form>


              <div className="title form-Group input" >
                <label className="form-label"
                  style={{ flex: 1 }}
                  htmlFor="title"
                >
                  Title :{' '}
                </label>
                <input
                  type="text"
                  name="title"
                  // onChange={this.onChange}
                  className={
                    formErrors.title.length > 0
                      ? 'error form-control'
                      : 'form-control'
                  }
                  style={{ flex: 2 }} />
              </div>





              <div className="addPhoto">
                <p>Add Photo : </p>
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={this.handleFile}
                  style={{ color: '#484848' }}
                />
              </div>
            </form>
          </div>

        )
          : (<h1>You have to log in first!</h1>)
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    itineraries: state.itineraries,
    cities: state.cities,
    login: state.login,
    profile: state.profile.profile
  }
}


export default connect(mapStateToProps, { isLoggedIn })(AddItinerary);

