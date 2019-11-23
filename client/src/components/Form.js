import React, { Component } from 'react';
import '../App.css';

class Form extends Component {
  render() {
    return (
      <form id={this.props.cssId} onSubmit={this.props.func}>
        <input type="text" name="pet" placeholder="put in a pet name" />
        <input type="text" name="type" placeholder="put in a type" />

        <button>{this.props.submitButton}</button>
      </form>
    );
  }
}

export default Form;