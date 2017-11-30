import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View} from 'react-native';
import Header from './app/components/Header'
import Sign_in from './app/views/Sign_in'
import Sign_up from './app/views/Sign_up'

export default class capstone extends Component {
  render (){
    return(
      <View>
        <Header />
        <Sign_in />
      </View>
    )
  }
}

AppRegistry.registerComponent('capstone', () => Capstone)
