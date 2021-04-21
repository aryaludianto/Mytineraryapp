import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import LandingPage from './component/LandingPage/LandingPageV2'
// eslint-disable-next-line no-unused-vars
import Header from './component/Header/Header'
// eslint-disable-next-line no-unused-vars
import Footer from './component/Footer/Footer'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './component/Login/Login';
import CreateAccount from './component/CreateAccount/CreateAccount';
import Cities from './component/Cities/Cities';
import Itineraries from './component/Itineraries/Itineraries';
import LogOut from './component/Header/LogOut';
import Profile from './component/ProfilePage/Profile'
import ProfilePageCont from './component/ProfilePage/ProfilePageCont'
import favouriteCont from './component/Favourite/FavouriteCont';
import AddItinerary from './component/AddItinerary/AddItinerary'
import Activity from './component/Activities/Activities'
import './App.css';

class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path='/' component={LandingPage} />
          <Route path='/Login' component={Login} />
          <Route path='/CreateAccount' component={CreateAccount} />
          <Route path='/Cities' component={Cities} />
          <Route path='/Itineraries' component={Itineraries} />
          <Route path='/LogOut' component={LogOut} />
          <Route path='/Profile' component={Profile} />
          <Route path='/ProfilePageCont' component={ProfilePageCont} />
          <Route path='/favourite' component={favouriteCont} />
          <Route path='/add' component={AddItinerary} />
          <Route path='/Activity' component={Activity} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
