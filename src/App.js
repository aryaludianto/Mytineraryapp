// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import LandingPage from './component/LandingPageV2'
// eslint-disable-next-line no-unused-vars
import Header from './component/Header'
// eslint-disable-next-line no-unused-vars
import Footer from './component/Footer'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './component/Login'
import CreateAccount from './component/CreateAccount'
import Cities from './component/Cities'
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
