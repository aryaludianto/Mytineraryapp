// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import './Cities.css';

export class CitiesFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      citiesFilter: ''
    }
  }

  handleChange(e) {
    this.setState({
      citiesFilter: e.target.value
    })
    // this.props.onChange(e.target.value)
    console.log(this.state.citiesFilter)
  }

  render() {
    return (
      <div className="citiesFillContainer">
        <p className="citiesFilter">Filter Our Current cities</p>
        <input type="text" className="citiesFill" value={this.state.cities}
          onChange={this.handleChange} />
      </div>
    )
  }
}

export default CitiesFilter
