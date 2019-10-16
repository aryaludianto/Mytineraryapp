import React, { Component } from 'react';
import { isLoggedIn } from '../../store/actions/loginActions';
import { connect } from 'react-redux';
import { fetchCities } from '../../store/actions/citiesActions'
import './AddItinerary.css';
// import { Card, Accordion } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Accordion } from 'react-bootstrap';



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
      activity: {
        name: '',
        address: '',
        img: '',
        time: '',
        cost: '',
        comment: ''
      },
      activities: [{
        name: '',
        address: '',
        img: '',
        time: '',
        cost: '',
        comment: ''
      }],
      formErrors: {
        title: '',
        city: '',
        rating: '',
        profileId: '',
        duration: '',
        price: '',
        hashtag: '',
        activity: [{
          name: '',
          address: '',
          img: '',
          time: '',
          cost: '',
          comment: ''
        }]
      }
    }
    this.onChange = this.onChange.bind(this);

    this.addHastag = this.addHastag.bind(this);
    this.removeHastag = this.removeHastag.bind(this);
    this.activityOnChange = this.activityOnChange.bind(this)
    this.addActivity = this.addActivity.bind(this)
    this.printState = this.printState.bind(this)
    this.handleFile = this.handleFile.bind(this);

  }

  addHastag(e) {
    e.preventDefault();
    let same = this.state.hashtags.filter(hash => hash == this.state.hashtag)

    if (same.length > 0) {
      return null
    }
    else if (!this.state.hashtag) {
      return null
    }
    else {
      this.setState({ hashtags: [...this.state.hashtags, this.state.hashtag] }, () => console.log(this.state));
      this.setState({ hashtag: '' })
    }
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
          value.length < 3 ? 'minimum 3 characters required' : '';
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

  handleFile(event) {
    console.log('this is event', event);
    console.log('selectedfile', event.target.files[0]);
    this.setState({ activity:{ img:event.target.files[0] } });
  }


  activityOnChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'name':
        formErrors.activity[0].name =
          value.length < 3 ? 'minimum 3 characters required' : '';
        break;
      case 'address':
        formErrors.activity[0].address =
          value.length < 6 ? 'minimum 3 characters required' : '';
        break;
      case 'time':
        formErrors.activity[0].time =
          value.length < 6 ? 'minimum 3 characters required' : '';
        break;
      case 'cost':
        formErrors.activity[0].cost =
          value.length < 3 ? 'minimum 3 characters required' : '';
        break;
      case 'comment':
        formErrors.activity[0].comment =
          value.length < 4 ? 'minimum 4 characters required' : '';
        break;
      default:
        break;
    }

    this.setState({ formErrors, activity: { ...this.state.activity, [name]: value } }, () => console.log(this.state));
  }



  removeHastag(e) {
    let res = this.state.hashtags.filter(hash => {
      return hash !== e
    })

    this.setState({ hashtags: res })

  }

  addActivity(e) {
    e.preventDefault();
    let act = this.state.activity,
      prev = this.state.activities.filter(act => act.name !== '');

    this.setState({
      activities: [act, ...prev,],
      activity: {
        name: '',
        address: '',
        img: '',
        time: '',
        cost: '',
        comment: ''
      }
    })



  }


  printState(e) {
    e.preventDefault();

    console.log(this.state)
  }



  componentDidMount() {
    this.props.isLoggedIn()
    this.props.fetchCities()
  }





  render() {
    const { formErrors } = this.state;


    const hastagsDisp = this.state.hashtags !== [] && (<div className="hashtagDisp">
      <p>Click To remove Hashtag -> </p>
      {this.state.hashtags.map(hashtag => {
        let hashdisp = this.state.hashtags[0] !== [] && '#' + hashtag
        return (<p key={hashtag} onClick={() => this.removeHastag(hashtag)}>{hashdisp}</p>)
      })}
    </div>)


    const activityDisp = this.state.activities.map(activity => {

      return (
        <div className='' key={activity.index}>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  {activity.name}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                {/* <Card.Img variant="top" src={activity.img} /> */}
                <Card.Body>
                  <div className='activityDisplay'>
                    <p>Address : </p> {activity.address}
                    <p>Cost : </p> {activity.cost}
                    <p>Comment : </p> {activity.comment}
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div >
      )
    })


    return (
      <div className='addItiPage' >
        {
          this.props.login.isLoggedIn ? (
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
                {this.state.hashtags.length >= 1 ? hastagsDisp : null}


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

                  {this.state.activities[0].name !== '' && activityDisp}

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
                      onChange={this.activityOnChange}
                      value={this.state.activity.name}
                      className={
                        formErrors.activity[0].name.length > 0
                          ? 'error form-control'
                          : 'form-control'
                      }
                      style={{ flex: 2 }} />
                  </div>
                  {formErrors.activity[0].name.length > 0 && (
                    <div className="errorForm AddItis">
                      <span>{formErrors.activity[0].name}</span>
                    </div>
                  )}

                  <div className="address form-Group input" >
                    <label className="form-label"
                      style={{ flex: 1 }}
                      htmlFor="address"
                    >
                      Address :{' '}
                    </label>
                    <input
                      type="text"
                      name="address"
                      onChange={this.activityOnChange}
                      value={this.state.activity.address}

                      className={
                        formErrors.activity[0].address.length > 0
                          ? 'error form-control'
                          : 'form-control'
                      }
                      style={{ flex: 2 }} />
                  </div>
                  {formErrors.activity[0].address.length > 0 && (
                    <div className="errorForm AddItis">
                      <span>{formErrors.activity[0].address}</span>
                    </div>
                  )}


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
                      onChange={this.activityOnChange}
                      value={this.state.activity.time}
                      className={
                        formErrors.activity[0].time.length > 0
                          ? 'error form-control'
                          : 'form-control'
                      }
                      style={{ flex: 2 }} />
                  </div>
                  {formErrors.activity[0].time.length > 0 && (
                    <div className="errorForm AddItis">
                      <span>{formErrors.activity[0].time}</span>
                    </div>
                  )}


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
                      onChange={this.activityOnChange}
                      value={this.state.activity.cost}
                      className={
                        formErrors.activity[0].cost.length > 0
                          ? 'error form-control'
                          : 'form-control'
                      }
                      style={{ flex: 2 }} />
                  </div>
                  {formErrors.activity[0].cost.length > 0 && (
                    <div className="errorForm AddItis">
                      <span>{formErrors.activity[0].cost}</span>
                    </div>
                  )}


                  <div className="comment form-Group input" >
                    <label className="form-label"
                      style={{ flex: 1 }}
                      htmlFor="comment"
                    >
                      Comment :{' '}
                    </label>
                    <input
                      type="text"
                      name="comment"
                      onChange={this.activityOnChange}
                      value={this.state.activity.comment}

                      className={
                        formErrors.activity[0].comment.length > 0
                          ? 'error form-control'
                          : 'form-control'
                      }
                      style={{ flex: 2 }} />
                  </div>
                  {formErrors.activity[0].comment.length > 0 && (
                    <div className="errorForm AddItis">
                      <span>{formErrors.activity[0].comment}</span>
                    </div>
                  )}


                  <div className='addActButCont'>
                    <button onClick={this.addActivity}> Add Activity </button>
                    <button onClick={this.printState}> Print state </button>

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

