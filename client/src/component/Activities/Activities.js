import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'



import { fetchActivity } from '../../store/actions/activityActions'



export class Activities extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.props.fetchActivity(window.location.href.split('/'))
  }

  generateImageURL(fileLocation) {
    if (fileLocation[0] === 'u')
      return `/${fileLocation}`
    else
      return fileLocation
  }

  render() {

    console.log(this.props.activity)

    const activityHead = this.props.activity.activity && this.props.activity.activity.map(activity => {
      return (
        <div className="citiesDisp" key={activity._id}>
          <div className="card" style={{
            backgroundImage: `url(${this.generateImageURL(activity.img)})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}></div>
          <div className="cityName">
            <h1 className="cityName">{activity.name}</h1>
          </div>
        </div>
      )
    })

    const activityBody = this.props.activity.activity && this.props.activity.activity.map(activity => {


      return (
        <div className='activityBody' style={{ 'marginTop': '10%', 'overflow':'scroll' }} key={activity._id}>
          <Card style={{ width: '100vw', height: '60vh' }}>
            <Card.Body>


              <Card.Title>Comment</Card.Title>
              <Card.Text>
                " {activity.comments} " 
              </Card.Text>
            </Card.Body>


            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <Card.Title>Time</Card.Title>
                <Card.Text>
                  {activity.time} Hours
                </Card.Text>
              </ListGroupItem>

              <ListGroupItem>
                <Card.Title>Cost</Card.Title>
                <Card.Text>
                  {activity.cost}
                </Card.Text>

              </ListGroupItem>

              <ListGroupItem>
                <Card.Title>Address</Card.Title>
                <Card.Text>
                  {activity.address}
                </Card.Text>

              </ListGroupItem>

            </ListGroup>
          </Card>


        </div>

      )
    })


    return (
      <div className="itinerariesBody">
        <div className="topCard" >
          <div className="cityDisplay">
            {activityHead}
          </div>
          <div className='itineraries' style={{ 'overflow':'scroll'}}>
            {activityBody}
          </div>

        </div>
      </div>
    );
  }
}




const mapStateToProps = (state) => {
  return {
    itineraries: state.itineraries,
    login: state.login,
    activity: state.activities
  }
}

export default connect(mapStateToProps, { fetchActivity })(Activities);
