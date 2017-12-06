import React, {Component} from 'react'
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, AsyncStorage, Image} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      userId: -1,
      tasks: [],
      tasks_list: []
    }
  }

  componentDidMount() {
    console.log("in component did mount");
    AsyncStorage.getItem('data').then(res => JSON.parse(res)).then((user) => {
      this.setState({userId: user.user_id})
    }).then(this.getUserTasks)
  }

  getUserTasks = () => {
    console.log("state at update", this.state);
    fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks/user/' + `${this.state.userId}`).then(res => res.json()).then(response => {
      this.setState({
        tasks: response
      })
    }).catch(error => {
      console.log("failure");
      console.error(error);
    })
  }

  displayUserTasks = () => {
    console.log(this.state);
    return this.state.tasks
    .map(task =>
      <View key={task.id} style={styles.taskBack}>
        <Button
          onPress={this.showTaskBreakdown.bind(this, task.id)}
          title={task.task_name}
          accessibilityLabel="Update Button"
        />
        {this.getTaskItems(task.id)}
        <Text>Due Date: {task.date}</Text>

      </View>
    )
  }

  showTaskBreakdown = (val) => {
    console.log(val);
    fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks_list/task/' + val)
    .then(res => res.json())
    .then(response => {
      this.setState({tasks_list: response})
      console.log(response);
      console.log("state 55", this.state);
    })
    .catch(function(error) {
      console.log(error.message);
      throw error;
    });
  }

  getTaskItems = (taskId) => this.state.tasks_list
  .filter(task_item => task_item.task_id === taskId)
  .map(task_item =>
      <View key={task_item.id}>
        <Text>{task_item.task_item}</Text>
      </View>
    )



  render() {
    return (
      <View>
      <Header/>
      <View style={styles.myView}>
        <Text style={styles.signUp}>Tasks</Text>
        <View>
          {this.displayUserTasks()}
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

module.exports = Home
