//client/src/components/App.js
import React, { Component } from "react";
import { Router, Route, Switch } from "react-router";

import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./comps/TodoTemplate";
import TodoHead from "./comps/TodoHead";
import TodoList from "./comps/TodoList";
import TodoCreate from "./comps/TodoCreate";
import { TodoProvider } from "./TodoContext";

import Api_test from "./Api_test";
const GlobalStyle = createGlobalStyle`
body {
    background: #e9ecef;
}`;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div className="App">
        <TodoProvider>
          <GlobalStyle />
          <TodoTemplate>
            <TodoHead />
            <TodoList />
            <TodoCreate />
          </TodoTemplate>
        </TodoProvider>
        {/*
        <Switch>
          <Route exact path="/" component={Api_test} />
          <Route path="/Api_test" component={Api_test} />
        </Switch>
        */}
      </div>
    );
  }
}

export default App;
