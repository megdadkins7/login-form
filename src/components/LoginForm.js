import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";
import { withRouter } from "react-router-dom";

const StyledForm = styled.div`
  form {
    max-width: 420px;
    margin: 50px auto;
  }
  .FormInput {
    color: white;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 18px;
    border-radius: 5px;
    line-height: 22px;
    background-color: transparent;
    border: 2px solid #915ee8;
    transition: all 0.3s;
    padding: 13px;
    margin-bottom: 15px;
    width: 100%;
    box-sizing: border-box;
    outline: 0;
  }
  .FormInput:focus {
    border: 2px solid #6c29e0;
  }
  textarea {
    height: 150px;
    line-height: 150%;
    resize: vertical;
  }
  [type="submit"] {
    font-family: Helvetica, Arial, sans-serif;
    width: 100%;
    background: #915ee8;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
    color: white;
    font-size: 24px;
    padding-top: 10px;
    padding-bottom: 10px;
    transition: all 0.3s;
    margin-top: -4px;
    font-weight: 700;
  }
  [type="submit"]:hover {
    background: #783be3;
  }
  .Account {
    text-align: center;
  }
  .EmailHelp {
    margin-bottom: 10px;
  }
`;

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      email: state.email,
      password: state.password,
    };
    axios
      .post(API_BASE_URL + "login", payload)
      .then(function (response) {
        if (response.data.code === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to home page..",
          }));
          redirectToHome();
          props.showError(null);
        } else if (response.data.code === 204) {
          props.showError("Username and password do not match");
        } else {
          props.showError("Username does not exists");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    props.updateTitle("Register");
  };
  return (
    <StyledForm>
      <form>
        <div className="EmailHelp">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            className="FormInput"
            type="email"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
          <small id="emailHelp">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div>
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            className="FormInput"
            type="password"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div></div>
        <button type="submit" onClick={handleSubmitClick}>
          Submit
        </button>
      </form>
      <div
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="Account">
        <span>Dont have an account? </span>
        <span onClick={() => redirectToRegister()}>Register</span>
      </div>
    </StyledForm>
  );
}

export default withRouter(LoginForm);
