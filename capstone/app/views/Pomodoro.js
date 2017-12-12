import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'
import Background from '../components/Background'


function secondsToHMS (secs) {
  const hours = Math.floor(secs / 3600)
  const mins = Math.floor(secs % 3600 / 60)
  const seconds = Math.floor(secs % 3600 % 60)
  return ((hours > 0 ? hours + ":" + (mins < 10 ? "0" : "") : "") + mins + ":" + (seconds < 10 ? "0" : "") + seconds)
}

export default class Pomodoro extends Component {
  constructor(){
    super()
    this.state = {
      initialTimer: (25 * 60),
      timer: (25 * 60),
      rest: (5 * 60),
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
          [activePeriod]: activePeriod === 'timer' ? this.state.timer : this.state.rest,
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
      timer: this.state.initialTimer,
      activePeriod: 'timer'
    })
    console.log("clicked reset");
  }

  render (){

    console.log("State",this.state);
    return(
      <View>
        <Background>
        <Header />
        <View style={styles.myView}>
          <View style={styles.card}>
          <Text style={styles.timer}>Timer: {secondsToHMS(this.state.timer)}</Text>
          <Text style={styles.timer}>Rest: {secondsToHMS(this.state.rest)}</Text>
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
        </Background>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  myView: {
    justifyContent:'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 80
  },
  card: {
    backgroundColor: 'white',
    width: 300,
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 10
  },
  timer:{
    fontWeight: '700',
    fontSize: 60
  },
  buttonBack: {
    width: 130,
    padding: 5,
    margin: 15,
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
