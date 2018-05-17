import React from 'react';
// import { GoogleLogin } from 'react-google-login-component';
// import { FacebookLogin } from 'react-facebook-login-component';
import {Field, reduxForm, focus} from 'redux-form';
import {Redirect} from 'react-router-dom';
import {required, nonEmpty} from '../../validators';
import {socialLogin, login} from '../../actions/auth';
import AppDescription from './app-description.js';
import { connect } from 'react-redux';

import '../../styles/login-form.css';

export class LoginForm extends React.Component {

  // responseGoogle (googleUser) {
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   return this.props.dispatch(socialLogin(id_token, 'google'))
  // }

  // responseFacebook (response) {
  //   return this.props.dispatch(socialLogin(response.accessToken, 'facebook'))
  // }
  
  onSubmit(values) {
    return this.props.dispatch(login(values.email, values.password));
  }

  // componentDidUpdate(){
  //   const error = null;
  //   if (this.props.error !== null){
  //     error = <div className="error-alert">Wrong username or password! Please try again</div>
  //   }
  // }

  render(){

    let error;

    if (this.props.error !== null){
      error = <div className="error-alert">Wrong username or password! Please try again.</div>
    }

    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return(
      <div className="home-container">
        <div className="auth-container">
          <h4 className="log-signup">
            Login or <a className="signup-link" href="/register">Signup</a>
          </h4>
          <div className="login-container">
            <form
              className="login-form"
              onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
              <Field
                placeholder="E-mail Address"
                component="input"
                type="text"
                name="email"
                id="email"
                validate={[required, nonEmpty]}
              />
              <Field
                placeholder="Password"
                component="input"
                type="password"
                name="password"
                id="password"
                validate={[required, nonEmpty]}
              />
              <button className="login-button"
                      type="submit">
                Login
              </button>
              <div className="memory">
                <p><input id="checkBox" type="checkbox" /> Remember Me</p>
                <a>Forgot Password?</a>
              </div>
              {error}
            </form>
          </div>
        </div>
        <div className="description-container">
          <AppDescription />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
  error: state.auth.error
})

LoginForm = connect(mapStateToProps)(LoginForm)

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);