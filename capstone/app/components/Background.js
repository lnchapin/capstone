import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, Dimensions, ImageBackground} from 'react-native';
const { height, width } = Dimensions.get("window");

export default class Background extends Component {
  render() {
    return (
      <ImageBackground
        source={require('../images/gradient.jpg')}
          style={{width: width, height: height}}
      >

      <View style={styles.ViewContainer}>
      {this.props.children}
      </View>
      </ImageBackground>
    );
  }
}

const styles=StyleSheet.create({
  ViewContainer:{
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  }
})

module.exports = Background
