import React, {Component} from 'react'
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'

export default class Shared extends Component {
  constructor() {
    super()
    this.state = {
      userId: -1,
      task_permission: [],
      tasks_list: [],
      task_list_items: []
    }
  }

  componentDidMount() {
    // console.log("in component did mount");
    AsyncStorage.getItem('data').then(res => JSON.parse(res)).then((user) => {
      this.setState({userId: user.user_id})
    }).then(this.getSharedUsers)
  }

  getSharedUsers = () => {
    fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks_permission/permittedToView/' + `${this.state.userId}`).then(res => res.json()).then(response => {
      this.setState({
        task_permission: response
      })
    }).catch(error => {
      console.log("failure");
      console.error(error);
    })
  }

  displayUsersYouCanSee = () => {
    return this.state.task_permission.map(task_permission =>
      <View key={task_permission.id}>
        <TouchableOpacity
          onPress={this.showTasks.bind(this, task_permission.app_users_id)}
          style={styles.taskBack}>
          <Text>{task_permission.first_name + ' ' + task_permission.last_name}</Text>
        </TouchableOpacity>
        {/* {this.getTaskItems(task_permission.app_users_id)} */}
      </View>
    )
  }

  showTasks = (id) => {
    console.log("id in showTasks", id);
    fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks/user/' + id)
    .then(res => res.json())
    .then(response => {
      this.setState({tasks_list: response, task_list_items: []})
      // console.log(response);
      // console.log("state 55", this.state);
  })
  .catch(function(error) {
    console.log(error.message);
    throw error;
  });
}

  showTaskList = (tasks_list) => {
    return tasks_list
    .map(task =>
      <View key={task.id} style={styles.taskBack}>
        <Button
          onPress={this.showTaskBreakdown.bind(this, task.id)}
          title={task.task_name}
          accessibilityLabel="Update Button"
        />
        {/* {this.showTaskBreakdown(task.id)} */}
        <Text>Due Date: {task.date}</Text>
      </View>
    )
  }
  showTaskListItems = (task_list_items, id) => {
    return task_list_items.map(task_item =>
        <View key={task_item.id}>
          <Text>{task_item.task_item} </Text>
        </View>
  )}


  showTaskBreakdown = (id) => {
    // console.log("show task breakdown id", id);
    fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks_list/task/' + id)
    .then(res => res.json())
    .then(response => {
      this.setState({
        task_list_items: response
      })
    })
      // console.log(response)
    .catch(function(error) {
      console.log(error.message);
      throw error;
    });
  }

  render() {
    let details = <View />
    if (this.state.tasks_list) {
      details = this.showTaskList(this.state.tasks_list)
    }
    let individualTasks = <View />
    if (this.state.task_list_items) {
      individualTasks = this.showTaskListItems(this.state.task_list_items)
      console.log("individualTasks", individualTasks);
    }
    return (
      <View>
      <Header/>
      <View style={styles.myView}>
        <Text style={styles.signUp}>Tasks</Text>
        <View>
          {this.displayUsersYouCanSee()}
          {details}
          {individualTasks}
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
