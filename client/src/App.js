import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { _loadPets, _deletePet, _createPet, _updatePet } from './services/PetService';
import { _signUp, _login } from './services/AuthService';
import Pet from './components/Pet';
import Form from './components/Form';

class App extends Component {
  constructor() {
    super();

    this.state = {
      pets : [{_id: 1, name: 'fido'}, {_id: 2, name: 'snowflake'}],
      name : 'will',
      edit_id : '',
      logged_in: false
    }

    // this.editPet = this.editPet.bind(this);
  }

  // deletePet() {
  //   alert('hi');
  // }

  getToken = () => {
    return localStorage.getItem('token');
  }

  deletePet = (event) => {

    //in button below add a data attribute with the pet's id

    var id = event.target.getAttribute('data-id');

    return _deletePet(id, this.getToken()).then(deletedPetId => {

            let pets = this.state.pets.filter(pet => pet._id !== deletedPetId)

            this.setState({pets})
          })

    //and in deletePet, write the fetch call to delete the Pet


    //so you click a button, you refresh and it's gone

    //12:05
  }

  createPet = (event) => {
    event.preventDefault();

    let name = event.target.children[0].value;
    let type = event.target.children[1].value;

    return _createPet(name, type, this.getToken()).then(rj => {
        let pets = [...this.state.pets, rj];
        this.setState({pets})
      })
  }

  updatePet = (event) => {
    event.preventDefault();

    let form = event.target;

    let updatedId = this.state.edit_id;
    let name = form.children[0].value;
    let type = form.children[1].value;

    return _updatePet(updatedId, name, type, this.getToken()).then(updatedPet => {

      let pets = this.state.pets.map(oldPet => {
        //if the pet in this.state.pets is not the pet we updated then leave it alone
        if (oldPet._id != updatedId) return oldPet;
        else return updatedPet;
      })

      this.setState({pets})
    })
  }

  editPet = (event) => {
    event.preventDefault();

    let name = event.target.getAttribute('data-name');
    let type = event.target.getAttribute('data-type');

    this.setState({
      edit_id : event.target.getAttribute('data-id')
    }, function(){

      let form = document.querySelector('#editForm');

      form.children[0].value = name;
      form.children[1].value = type;

    })


  }

  hideEditForm = (event) => {
    event.preventDefault();

    this.setState({edit_id : ""})
  }

  signUp = (event) => {
    event.preventDefault();

    let inputs = event.target.children;

    let username = inputs[0].value;
    let password = inputs[1].value;
    let passwordConf = inputs[2].value;

    if (password == passwordConf){

      return _signUp(username, password).then(res => {
        console.log(res);
        alert(res.message)
      });

    }else{
      alert('your password and password confirmation have to match!')
    }

  }

  login = (event) => {
    event.preventDefault();

    let inputs = event.target.children;

    let username = inputs[0].value;
    let password = inputs[1].value;

    return _login(username, password).then(res => {
      if (res.token){
        this.setState({logged_in: true}, function(){
          localStorage.setItem('token', res.token);
        });
      }else{
        alert('you were not logged in')
      }
    });
  }

  logout = (event) => {
    event.preventDefault();
    
    this.setState({logged_in: false}, function(){
      localStorage.removeItem('token');
    });
  }

  componentDidMount() {
    return _loadPets()
      .then(resultingJSON => this.setState({pets : resultingJSON}))
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. {this.state.edit_id}
          </p>

          <h1>{ this.state.name }</h1>

          {!this.state.logged_in && 
          
          <div>
            <h2>Sign Up</h2>

            <form id="signUpForm" onSubmit={this.signUp}>
              <input type="text" name="username" placeholder="put in a username" />
              <input type="password" name="password" placeholder="put in a password" />
              <input type="password" name="password" placeholder="confirm your password" />

              <button>Sign Up To Add/Update/Delete Pets</button>
            </form>

            <h2>Log In</h2>

            <form id="logInForm" onSubmit={this.login}>
              <input type="text" name="username" placeholder="put in a username" />
              <input type="password" name="password" placeholder="put in a password" />

              <button>Log In To Add/Update/Delete Pets</button>
            </form>

            <br /><br /><br />
          </div>}

          {this.state.logged_in && 
          
          <div>
            <h2>Sign Out</h2>

            <form id="logOutForm" onSubmit={this.logout}>
              <button>Log Out</button>
            </form>

            <br /><br /><br />
          </div>}

          <Form func={this.createPet} submitButton="make pet" />

          {(this.state.edit_id != "") && <Form cssId="editForm" func={this.updatePet} submitButton="update pet" />}

          {(this.state.edit_id != "") && <a href="#" onClick={this.hideEditForm}>hide edit form</a>}

          {this.state.pets.map((x) => <Pet _id={x._id} name={x.name} type={x.type} delete={this.deletePet} edit={this.editPet} />)}

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;