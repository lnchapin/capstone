import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'


export default class Pomodoro extends Component {
  constructor(){
    super()
    this.state = {
      timer: 10,
      rest: 10,
      activePeriod: 'timer',
      timerRunning: false
    }
  }

  handlePeriod = () => {
    if(this.state.timerRunning){
      this.setState({timerRunning: false})
      return window.clearInterval(this.interval)
    }

    this.interval = setInterval(() => {
      const activePeriod = this.state.activePeriod
      const nextSecond = this.state[activePeriod] - 1

      if (nextSecond === 0) {
        this.setState({
          [activePeriod]: 10,
          activePeriod: this.state.activePeriod === 'timer' ? 'rest' : 'timer'
        })
      } else {
        this.setState({
          [activePeriod]: nextSecond,
          timerRunning: true
        })
      }
    }, 1000)
  }

  handleReset = () => {
    window.clearInterval(this.interval)
    this.setState({
      timer: 10,
      activePeriod: 'timer'
    })
  }

  render (){

    console.log("State",this.state);
    return(
      <View>
        <Header />
        <View style={styles.myView}>
          <Text style={styles.timer}>Timer: {this.state.timer}</Text>
          <Text style={styles.timer}>Rest: {this.state.rest}</Text>
          {/* <Text>Active Period: {this.state.activePeriod}</Text> */}
          <View style={styles.buttonBack}>
            <TouchableOpacity
              style={styles.buttonTextContainer}
              onPress={this.handlePeriod}>
              <Text style={styles.buttonText}>Run/Pause</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonBack}>
            <TouchableOpacity
              style={styles.buttonTextContainer}
              onPress={this.handleReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  myView: {
    justifyContent:'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 200
  },
  timer:{
    fontWeight: '700',
    fontSize: 40
  },
  buttonBack: {
    width: 130,
    padding: 5,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#e1dede'
  },
  buttonTextContainer: {
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20
  }
})

module.exports = Pomodoro
