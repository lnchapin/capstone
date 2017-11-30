import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View} from 'react-native';

export default class Header extends Component {
  render (){
    return(
      <View style={styles.header}>
        <Text style={styles.name}>Solanum</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 15,
    paddingBottom: 5,
    alignItems: 'center',
    backgroundColor: '#7ACDC1'
  },
  name:{
    fontSize: 24
  }
})

AppRegistry.registerComponent('Header', () => Capstone)
