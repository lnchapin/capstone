import React from 'react'
import {StackNavigator} from 'react-navigation'
import Sign_up from '../views/Sign_up'
import Sign_in from '../views/Sign_in'

const RootStack = StackNavigator({
  Login: {
    screen: Sign_up,
  },
  SignUp: {
    path: '../views/Sign_up',
    screen: Sign_up,
  },
}, {
  initialRouteName: 'SignUp',
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

module.exports = App
