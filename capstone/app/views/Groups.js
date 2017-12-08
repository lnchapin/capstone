import React, {Component} from 'react'
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'

export default class Groups extends Component {
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
      console.log("user.user_id", user.user_id)
      console.log(this.state.userId)
    }).then(this.getPermitted)
  }

  getPermitted = () => {
    console.log("state at update", this.state);
    fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks_permission/userPermitted/' + `${this.state.userId}`).then(res => res.json()).then(response => {
      console.log(response);
      this.setState({
        task_permission: response
      })
      console.log("state 31", this.state);
    }).catch(error => {
      console.log("failure");
      console.error(error);
    })
  }

  displayUsersYouPermitted = () => {
    return this.state.task_permission.map(task_permission =>
      <View key={task_permission.id} style={styles.taskBack}>
        <Text>{task_permission.first_name + ' ' + task_permission.last_name}</Text>
        <Button
          onPress={() => this.removePermission(task_permission.id)}
          title="Delete"
          accessibilityLabel="Delete Button"
        />
      </View>
    )
  }



  removePermission = (id) => {
    console.log("https://fast-depths-36909.herokuapp.com/api/v1/tasks_permission"+ id)
    fetch("https://fast-depths-36909.herokuapp.com/api/v1/tasks_permission/"+ id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    })
    .then(res => res.json())
    .then(response => {
      if(response.error){
        alert(response.error)
      } else {
        console.log(response);
        this.getPermitted
        alert(response.message)
      }

    })
    .catch(function(error) {
      console.log("Delete error", error.message);
      throw error;
    });
  }

  render() {

    return (
      <View>
      <Header/>
      <View style={styles.myView}>
        <Text style={styles.signUp}>Tasks</Text>
        <View>
          {this.displayUsersYouPermitted()}
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
  },
  toDot: {
    width: 50,
    height: 50
  }

})

module.exports = Groups
