import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//components
import Alert from "./components/Alert";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Home from "./components/Home";

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App">
        <Header title={title} />
        <div>
          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>
            <Route path="/register">
              <RegistrationForm
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>
            <Route path="/login">
              <LoginForm
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
          <Alert errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
