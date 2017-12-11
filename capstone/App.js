Error.stackTraceLimit = 40
import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { Actions, Router, Scene, Tabs } from 'react-native-router-flux'
import Header from './app/components/Header'
import Sign_in from './app/views/Sign_in'
import Sign_up from './app/views/Sign_up'
import Pomodoro from './app/views/Pomodoro'
import Settings from './app/views/Settings'
import Home from './app/views/Home'
import Groups from './app/views/Groups'
import Shared from './app/views/Shared'
import AddTask from './app/views/AddTask'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene  key="root">
           {/* <Scene key="Sign_in" hideNavBar={true} component={Sign_in} initial={true} />
           <Scene key="Sign_up" hideNavBar={true} component={Sign_up} initial={false} /> */}
          <Scene key="inApp" tabs={true} hideNavBar={true}>
            <Scene key="Home" hideNavBar={true} component={Home} initial={false} />
            <Scene key="Pomodoro" hideNavBar={true} component={Pomodoro} initial={true} />
            <Scene key="AddTask" hideNavBar={true} component={AddTask} initial={false} />
            <Scene key="Shared" hideNavBar={true} component={Shared} initial={false} />
            <Scene key="Groups" hideNavBar={true} component={Groups} initial={false} />
            <Scene key="Settings" hideNavBar={true} component={Settings} initial={false} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}
