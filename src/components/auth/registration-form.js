import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {Redirect} from 'react-router-dom';// 
import {registerUser} from '../../actions/users';
// import { GoogleLogin } from 'react-google-login-component';
// import { FacebookLogin } from 'react-facebook-login-component';
import {login} from '../../actions/auth';
import {required, nonEmpty, matches, length, isTrimmed} from '../../validators';
import { connect } from 'react-redux';

import '../../styles/registration-form.css'

//update min password length before publishing!!
const passwordLength = length({min: 1, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {

  componentWillUpdate() {
    if (this.props.error !== null) {
      alert(this.props.error.message)
    }
  }

  // responseGoogle (googleUser) {
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   console.log({accessToken: id_token});
  //   return this.props.dispatch(socialLogin(id_token, 'google'))
  // }

  // responseFacebook (response) {
  //   return this.props.dispatch(socialLogin(response.accessToken, 'facebook'))
  // }

  onSubmit(values) {
    const {email, password, firstName, lastName} = values;
    const user = {
      email: email,
      name: {
        firstName: firstName,
        lastName: lastName
      },
      password: password
    }
    return this.props.dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(email, password)));
  }

  render(){

    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return(
      <div>
        <h4 className="log-signup">
          <a className="signup-link" href="/">Login</a> or Signup
        </h4>
        <div className="registration-container">
          <div className="welcome-msg">
            <h4>Welcome to News Spot - Let's get started</h4>
          </div>
          <div className="registration-div">
            <form className="registration-form"
                  onSubmit={this.props.handleSubmit(values =>
                      this.onSubmit(values)
                  )}>
              <div className="fullName">
                <Field 
                  placeholder="First Name"
                  name="firstName"
                  component="input"
                  type="text"
                  id="firstname" 
                  validate={[required, nonEmpty, isTrimmed]} />
                <Field
                  placeholder="Last Name"
                  name="lastName"
                  component="input"
                  type="text"
                  id="lastname"
                  validate={[required, nonEmpty, isTrimmed]} />
              </div>
              <div className="email-address">
                <Field
                  placeholder="E-mail Address"
                  name="email"
                  component="input" 
                  type="text"
                  id="emailaddress"
                  validate={[required, nonEmpty, isTrimmed]}  />
              </div>
              <div className="create-pw">
                <Field
                  placeholder="Password"
                  name="password"
                  component="input" 
                  type="password"
                  id="createpw"
                  validate={[required, passwordLength, isTrimmed]}   />
              </div>
              <div className="confirm-pw">
                <Field
                  placeholder="Confirm Password"
                  name="passwordconfirm"
                  component="input"
                  type="password"
                  id="confirmpw"
                  validate={[required, nonEmpty, matchesPassword]}    />
              </div>
              <button className="register-button"
                type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  loggedIn: state.auth.currentUser !== null,
  error: state.auth.error
})

RegistrationForm = connect(mapStateToProps)(RegistrationForm);

export default reduxForm({
  form: 'register',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(RegistrationForm);