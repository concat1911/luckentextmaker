import React, { Component } from 'react'

export default class Buttons extends Component {

  render() {
    if(!this.props.isDoingTest){
        return (
            <div className="ui massive blue buttons">
                <button className="ui button" onClick={this.props.luckenMaker}>Change</button>
                <button className="ui button" onClick={this.props.reset}>Clear</button>
                <button className="ui button" onClick={this.props.doingTest}>Test</button>
            </div>
        )
    }else{
        return (
            <div className="ui massive blue buttons">
                <button className="ui button" onClick={this.props.reset}>Go Back</button>
            </div>
        )
    }
  }
}
