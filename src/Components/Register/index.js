import { Component } from "react";
import Cookies from "js-cookie";
import "./index.css";

class Register extends Component {
  state = { username: "", password: "", isPasswordOK: true, errorMsg: "" };

  //this function is triggered whenever the user changes the input in username input field
  onChangeUserName = (event) => this.setState({ username: event.target.value });

  //this function is triggered whenever the user changes the input in password input field
  onChangePassword = (event) => this.setState({ password: event.target.value });

  validatePassword = (event) => {
    //when the user submits the Form this function is triggered
    event.preventDefault();
    const { password, username } = this.state;
    if (username === "" && password === "") {
      //check whether username and password are empty
      this.setState({
        isPasswordOK: false,
        errorMsg: "Please Enter your Username and Password",
      });
    } else if (username === "") {
      //check if username is empty
      this.setState({
        isPasswordOK: false,
        errorMsg: "Please Enter Your Username",
      });
    } else if (password === "") {
      //check is password is empty
      this.setState({
        isPasswordOK: false,
        errorMsg: "Please Enter your Password",
      });
    } else if (password.length < 8) {
      //check whether password has atleast 8 characters
      this.setState({
        isPasswordOK: false,
        errorMsg: "Password should consist atleast 8 characters",
      });
    } else {
      //If password and username are valid then get the JWT token and set a Cookie
      //so that for every subsequent query the jwt token is passed in the Authorization header and the server responds for Authorized users only
      this.setState({ isPasswordOK: true });
      //Cookies.set("jwt-token", "TemporaryValue");
    }
  };

  render() {
    const { username, password, isPasswordOK, errorMsg } = this.state;

    //Check whether a cookie with key jwt-token is present
    const isLoggedIn = Cookies.get("jwt-token");

    //if Cookie is set, the user is logged in, so redirect to Home
    if (isLoggedIn) {
      return <h1>You have Logged In</h1>;
      //Redirect to Home page
    }
    return (
      <div className="page-bg">
        <form className="register-card" onSubmit={this.validatePassword}>
          <h1>TaskRabbit</h1>
          <div className="input-container">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={this.onChangeUserName}
              className="input-styling"
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your Password"
              onChange={this.onChangePassword}
              className="input-styling"
            />
            {!isPasswordOK && <h1 className="warning-text">{errorMsg}</h1>}
          </div>
          <div className="button-container">
            <button className="register-button" type="submit">
              Register!
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
