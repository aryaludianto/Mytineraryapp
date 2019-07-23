// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import LandingPage from './component/LandingPage/LandingPageV2'
// eslint-disable-next-line no-unused-vars
import Header from './component/Header/Header'
// eslint-disable-next-line no-unused-vars
import Footer from './component/Footer/Footer'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './component/Login/Login'
import CreateAccount from './component/CreateAccount/CreateAccount'
import Cities from './component/Cities/Cities'
import './App.css'




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
          {/* <LandingPage /> */}
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
