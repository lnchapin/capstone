import React, {Component} from 'react'
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'

export default class Settings extends Component {
  constructor() {
    super()
    this.state = {
      userId: -1,
      tasks: null
    }
  }

  componentDidMount() {
    console.log("in component did mount");
    AsyncStorage.getItem('data').then(res => JSON.parse(res)).then((user) => {
      this.setState({userId: user.user_id})
      console.log("user.user_id", user.user_id)
      console.log(this.state.userId)
    }).then(this.getUserTasks)
  }

  getUserTasks = () => {
    console.log("state at update", this.state);
    fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks/user/' + `${this.state.userId}`).then(res => res.json()).then(response => {
      console.log(response);
      this.setState({
        tasks: response
      })
      console.log("state 31", this.state);
      for (var i = 0; i < response.length; i++) {
        console.log(response[i].task_name);
      }
    }).catch(error => {
      console.log("failure");
      console.error(error);
    })
  }

  displayUserTasks = () => {
    let arr = this.state.tasks
    arr.map
    for (var i = 0; i < arr.length; i++) {
      console.log(arr[i].date)
      console.log(arr[i].task_name)
    }
  }

  asyncCheck = () => {
    console.log(tasks);
    AsyncStorage.getItem('data').then((res) => console.log("getItem", res));
    console.log(this.state.userId);
    console.log("attempt at id from url", `${this.state.userId}`)
    console.log('https://fast-depths-36909.herokuapp.com/api/v1/tasks/user/' + `${this.state.userId}`);
  }

  render() {
    return (<View>
      <Header/>
      <View style={styles.myView}>
        <Text style={styles.signUp}>Tasks</Text>
        <View style={styles.buttonBack}>
          <Button onPress={this.displayUserTasks} title="Display Tasks" accessibilityLabel="Get Tasks Button"/>
        </View>
        <View style={styles.buttonBack}>
          <Button onPress={this.getUserTasks} title="Get Tasks" accessibilityLabel="Get Tasks Button"/>
        </View>
        <View style={styles.buttonBack}>
          <Button onPress={this.asyncCheck} title="Async Check" accessibilityLabel="Async Check Button"/>
        </View>
      </View>
    </View>)
  }
}

const styles = StyleSheet.create({
  myView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 150
  },
  signUp: {
    fontWeight: '700',
    fontSize: 24
  },
  textInput: {
    fontSize: 20,
    width: 250,
    padding: 5,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#e1dede'
  },
  buttonBack: {
    width: 100,
    padding: 5,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#e1dede'
  }
})

module.exports = Settings
