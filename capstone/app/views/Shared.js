import React, {Component} from 'react'
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'

export default class Shared extends Component {
  constructor() {
    super()
    this.state = {
      userId: -1,
      task_permission: []
    }
  }

  componentDidMount() {
    console.log("in component did mount");
    AsyncStorage.getItem('data').then(res => JSON.parse(res)).then((user) => {
      this.setState({userId: user.user_id})
    }).then(this.getSharedUsers)
  }

  getSharedUsers = () => {
    fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks_permission/permittedToView/' + `${this.state.userId}`).then(res => res.json()).then(response => {
      // console.log(response);
      this.setState({
        task_permission: response
      })
      // console.log("state 31", this.state);
    }).catch(error => {
      console.log("failure");
      console.error(error);
    })
  }

  displayUsersYouCanSee = () => {
    return this.state.task_permission.map(task_permission =>
      <View key={task_permission.id} style={styles.taskBack}>
        <Text>{task_permission.first_name + ' ' + task_permission.last_name}</Text>
      </View>
    )
  }

  asyncCheck = () => {
    AsyncStorage.getItem('data').then((res) => console.log("getItem", res));
    console.log(this.state.userId);
    console.log("attempt at id from url", `${this.state.userId}`)
    console.log('https://fast-depths-36909.herokuapp.com/api/v1/tasks_permission/permittedToView/' + `${this.state.userId}`);
  }

  render() {

    return (
      <View>
      <Header/>
      <View style={styles.myView}>
        <Text style={styles.signUp}>Tasks</Text>
        <View>
          {this.displayUsersYouCanSee()}
        </View>
      </View>
    </View>)
  }
}

const styles = StyleSheet.create({
  myView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
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
  taskBack: {
    width: 200,
    padding: 5,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#e1dede'
  }
})

module.exports = Shared
