Error.stackTraceLimit = 40
import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { Actions, Router, Scene, Tabs } from 'react-native-router-flux'
import Header from './app/components/Header'
import Sign_in from './app/views/Sign_in'
import Sign_up from './app/views/Sign_up'
import Pomodoro from './app/views/Pomodoro'
import Settings from './app/views/Settings'

export default class App extends React.Component {
  render() {
    return (
      // <Pomodoro />
      <Settings />
      // <Router>
      //   <Scene  key="root">
      //    <Scene key="Sign_in" hideNavBar={true} component={Sign_in} initial={true} />
      //    <Scene key="Sign_up" hideNavBar={true} component={Sign_up} initial={false} />
      //    </Scene>
      // </Router>
    );
  }
}
