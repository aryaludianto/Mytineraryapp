import React, { Component } from 'react';
import { isLoggedIn } from '../../store/actions/loginActions';
import { connect } from 'react-redux';
import { fetchCities } from '../../store/actions/citiesActions'
import './AddItinerary.css'



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
      hashtag: '',
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
        hashtag: '',
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
    this.onChange = this.onChange.bind(this);

    this.addHastag = this.addHastag.bind(this);
    this.removeHastag = this.removeHastag.bind(this);
  }

  addHastag(e) {
    e.preventDefault();
    this.setState({ hashtags: [...this.state.hashtags, this.state.hashtag] }, () => console.log(this.state));
    this.setState({ hashtag: '' })
  }

  onChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'title':
        formErrors.title =
          value.length < 3 ? 'minimum 3 characters required' : '';
        break;
      case 'rating':
        formErrors.rating =
          value.length < 6 ? 'minimum 3 characters required' : '';
        break;
      case 'duration':
        formErrors.duration =
          value.length < 6 ? 'minimum 3 characters required' : '';
        break;
      case 'price':
        formErrors.price =
          value.length < 3 ? 'minimum 3 characters required' : '';
        break;
      case 'hashtag':
        formErrors.hashtag =
          value.length < 4 ? 'minimum 4 characters required' : '';
        break;
      case 'city':
        formErrors.city = value.length < 0 ? 'please choose a country' : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));

  }

  removeHastag(e){
    let res = this.state.hashtags.filter(hash=>{
      return hash !==e
    })
    
    if (res.length == 0) this.setState({ hashtags:[] })
    this.setState({ hashtags:[res] })
  }





  componentDidMount() {
    this.props.isLoggedIn()
    this.props.fetchCities()
  }





  render() {
    const { formErrors } = this.state;
    const hastagsDisp = (<div className="hashtagDisp">
      {this.state.hashtags.map(hashtag => {
        return (<p key={hashtag} onClick={()=> this.removeHastag(hashtag)}> # {hashtag}</p>)
      })}
    </div>)


    return (
      <div className='addItiPage'>
        {this.props.login.isLoggedIn ? (
          <div className='addIti'>
            <h1> Add Itinerary </h1>
            <form>
              {/* City */}
              <div className="city form-group input">
                <label
                  className="form-label"
                  style={{ flex: 1 }}
                  htmlFor="city"
                >
                  City :{' '}
                </label>
                <select
                  className="custom-select"
                  name="city"
                  onChange={this.onChange}
                  required
                  style={{ flex: 2 }}
                  value={this.state.city}
                >
                  <option value='Choose your City'>
                    {this.state.city}
                  </option>
                  {this.props.cities.map(city => (
                    <option key={city._id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              {formErrors.city.length > 0 && (
                <div className="errorForm AddItis">
                  <span>{formErrors.city}</span>
                </div>
              )}

              {/* Title */}
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
                  onChange={this.onChange}
                  className={
                    formErrors.title.length > 0
                      ? 'error form-control'
                      : 'form-control inpt'
                  }
                  style={{ flex: 2 }} />
              </div>
              {formErrors.title.length > 0 && (
                <div className="errorForm AddItis">
                  <span>{formErrors.title}</span>
                </div>
              )}




              {/* Duration */}
              <div className="duration form-Group input" >
                <label className="form-label"
                  style={{ flex: 1 }}
                  htmlFor="duration"
                >
                  Duration :{' '}
                </label>
                <input
                  type="text"
                  name="duration"
                  onChange={this.onChange}
                  className={
                    formErrors.duration.length > 0
                      ? 'error form-control'
                      : 'form-control'
                  }
                  style={{ flex: 2 }} />
              </div>
              {formErrors.duration.length > 0 && (
                <div className="errorForm AddItis">
                  <span>{formErrors.duration}</span>
                </div>
              )}

              <div className="price form-Group input" >
                <label className="form-label"
                  style={{ flex: 1 }}
                  htmlFor="price"
                >
                  Price :{' '}
                </label>
                <input
                  type="text"
                  name="price"
                  onChange={this.onChange}
                  className={
                    formErrors.price.length > 0
                      ? 'error form-control'
                      : 'form-control'
                  }
                  style={{ flex: 2 }} />
              </div>

              <div className="rating form-Group input" >
                <label className="form-label"
                  style={{ flex: 1 }}
                  htmlFor="rating"
                >
                  Rating :{' '}
                </label>
                <input
                  type="text"
                  name="rating"
                  onChange={this.onChange}
                  className={
                    formErrors.rating.length > 0
                      ? 'error form-control'
                      : 'form-control'
                  }
                  style={{ flex: 2 }} />
              </div>


              {/* hastags */}
              {this.state.hashtags.length > 0 && hastagsDisp}


              <div className="hashtag form-Group input" >
                <label className="form-label"
                  style={{ flex: 1 }}
                  htmlFor="hashtags"
                >
                  Hashtag :{' '}
                </label>
                <input
                  type="text"
                  name="hashtag"
                  value={this.state.hashtag}
                  onChange={this.onChange}
                  className={
                    formErrors.hashtag.length > 0
                      ? 'error form-control'
                      : 'form-control'
                  }
                  style={{ flex: 2 }} />
                <button onClick={this.addHastag}> Add Hastag </button>

              </div>
              {formErrors.hashtag.length > 0 && (
                <div className="errorForm AddItis">
                  <span>{formErrors.hashtag}</span>
                </div>
              )}








              <div className='activities'>

                <h3>Activities</h3>

                <div className="name form-Group input" >
                  <label className="form-label"
                    style={{ flex: 1 }}
                    htmlFor="name"
                  >
                    Name :{' '}
                  </label>
                  <input
                    type="text"
                    name="name"
                    // onChange={this.onChange}
                    className={
                      formErrors.activities[0].name.length > 0
                        ? 'error form-control'
                        : 'form-control'
                    }
                    style={{ flex: 2 }} />
                </div>

                <div className="address form-Group input" >
                  <label className="form-label"
                    style={{ flex: 1 }}
                    htmlFor="address"
                  >
                    Address :{' '}
                  </label>
                  <input
                    type="text"
                    name="title"
                    // onChange={this.onChange}
                    className={
                      formErrors.activities[0].address.length > 0
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


                <div className="time form-Group input" >
                  <label className="form-label"
                    style={{ flex: 1 }}
                    htmlFor="time"
                  >
                    Time :{' '}
                  </label>
                  <input
                    type="text"
                    name="time"
                    // onChange={this.onChange}
                    className={
                      formErrors.activities[0].time.length > 0
                        ? 'error form-control'
                        : 'form-control'
                    }
                    style={{ flex: 2 }} />
                </div>

                <div className="cost form-Group input" >
                  <label className="form-label"
                    style={{ flex: 1 }}
                    htmlFor="cost"
                  >
                    Cost :{' '}
                  </label>
                  <input
                    type="text"
                    name="cost"
                    // onChange={this.onChange}
                    className={
                      formErrors.activities[0].cost.length > 0
                        ? 'error form-control'
                        : 'form-control'
                    }
                    style={{ flex: 2 }} />
                </div>

                <div className="comment form-Group input" >
                  <label className="form-label"
                    style={{ flex: 1 }}
                    htmlFor="cost"
                  >
                    Comment :{' '}
                  </label>
                  <input
                    type="text"
                    name="comment"
                    // onChange={this.onChange}
                    className={
                      formErrors.activities[0].comments.length > 0
                        ? 'error form-control'
                        : 'form-control'
                    }
                    style={{ flex: 2 }} />
                </div>

                <div className='addActButCont'>
                  <button> Add Activity </button>

                </div>
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


export default connect(mapStateToProps, { isLoggedIn, fetchCities })(AddItinerary);

