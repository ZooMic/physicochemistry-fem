import React, { Component } from 'react';
import { Header } from '../../components/Header';
import './App.css';

/** Right now it does not look like I container but soon there will be some logic. Probably from Electron comunication*/

export default class App extends Component {
  render() {
    return (
      <Header />
    );
  }
}


