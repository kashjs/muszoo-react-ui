import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import VideoList from "./VideoList/VideoList";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <nav><div className="muszoo-logo"></div></nav>
        </header>
        <div className="app-sidebar"></div>
        <div className="app-content"><VideoList></VideoList></div>
        <div className="app-footer"></div>
      </div>
    );
  }
}

export default App;
