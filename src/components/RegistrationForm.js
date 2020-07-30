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

function RegistrationForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const sendDetailsToServer = () => {
    if (state.email.length && state.password.length) {
      props.showError(null);
      const payload = {
        email: state.email,
        password: state.password,
      };
      axios
        .post(API_BASE_URL + "register", payload)
        .then(function (response) {
          if (response.data.code === 200) {
            setState((prevState) => ({
              ...prevState,
              successMessage:
                "Registration successful. Redirecting to home page..",
            }));
            redirectToHome();
            props.showError(null);
          } else {
            props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      props.showError("Please enter valid username and password");
    }
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  const redirectToLogin = () => {
    props.updateTitle("Login");
    props.history.push("/login");
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      sendDetailsToServer();
    } else {
      props.showError("Passwords do not match");
    }
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
        <div>
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            className="FormInput"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={state.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmitClick}>
          Register
        </button>
      </form>
      <div
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="Account">
        <span>Already have an account? </span>
        <span onClick={() => redirectToLogin()}>Login here</span>
      </div>
    </StyledForm>
  );
}

export default withRouter(RegistrationForm);
