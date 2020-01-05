import React from 'react';
import './App.css';
import axios from 'axios';
import oauth from 'axios-oauth-client';
import crypto from 'crypto';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loginPage: false
    }
    this.rocp = this.rocp.bind(this);
    this.backButons = this.backButons.bind(this);
  }

  rocp() {
    this.setState({
      loginPage: true
    });
  }

  

  backButons() {
    this.setState({
      loginPage: false
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            {!this.state.loginPage ? <Button rocp={this.rocp} acg={this.acg}/> : null}
            {this.state.loginPage ? <Rocp backButons={this.backButons}/> : null}
          </div>
        </header>
      </div>
    );
  }
}

class Button extends React.Component{
  constructor() {
    super();

    this.base64URLEncode = this.base64URLEncode.bind(this);
  }

  base64URLEncode(str) {
    return str.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  render() {
    let verifier = this.base64URLEncode(crypto.randomBytes(32));
    let uri = 'http://127.0.0.1:8000/oauth/authorize?client_id=4&response_type=code&redirect_uri=http://127.0.0.1:3000/acg&scope=';
    return(
      <div className='mb-5'>
        <button className='btn-lg btn-success mr-3' onClick={this.props.rocp}>Resource Owner Password Credentials</button>
        <a className='btn-lg btn-primary' href={uri}>Authorization Code Grant</a>
      </div>
    )
  }
}

class Rocp extends React.Component {
  constructor() {
    super();

  }

  login() {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    let data = {
      username: email,
      password: password,
      client_secret: 'g5doYTDJMuUEob50TFPLtovlNO6f2z2RTPBCBtaz',
      client_id: 2,
      grant_type: 'password'
    }

    let config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.post('http://127.0.0.1:8000/oauth/token', data, config)
      .then(function(response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(JSON.stringify(error))
      })
  }

  render() {    
    return (
      <div className='col-md-12 p-5'>
        <p>Login</p>
        <div className='row m-5'>
          <div className='col-md-12'>
            <input className='text-center' id='email' type='text' placeholder='Email'/>
          </div>
        </div>
        <div className='row m-5'>
          <div className='col-md-12'>
            <input className='text-center' id='password' type='text' placeholder='Password'/>
          </div>
        </div><div className='row m-5'>
          <div className='col-md-12'>
            <button className='btn-lg btn-success mr-3' onClick={this.login}>Login</button>
            <button className='btn-lg btn-primary' onClick={this.props.backButons}>Voltar</button>
          </div>
        </div>
      </div>
    )
  }
}

class Acg extends React.Component {
  componentDidMount() {
    let urlString = window.location.href;
    let uri = new URL(urlString);
    let code = uri.searchParams.get('code'); 

    let getAuthorizationCode = oauth.client(
      axios.create(), {
        url: 'http://127.0.0.1:8000/oauth/token',
        grant_type: 'authorization_code',
        client_id: 4,
        client_secret: '0jfSIRSHBqmeaJUhzm1nYYLUMF2kPs2XQUmxEqrn',
        redirect_uri: 'http://127.0.0.1:3000/acg',
        code: code
      }
    )
    console.log(getAuthorizationCode());
  }

  render() {
    return (
      'a'
    )
  }
}

export {
  App,
  Acg
}
