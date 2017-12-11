import React, {Component} from 'react'
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, AsyncStorage, Image, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'

export default class AddTask extends Component {
  constructor(){
    super()
    this.state = {
      task_name: '',
      task_item: [],
      task_item_1: '',
      task_item_2: '',
      task_item_3: '',
      task_item_4: '',
      task_item_5: '',
      task_id: -1,
      date: '',
      time: '',
      active: true,
      userId: -1
    }
  }

  componentDidMount() {
    // console.log("in component did mount");
    AsyncStorage.getItem('data').then(res => JSON.parse(res)).then((user) => {
      this.setState({userId: user.user_id})
      // console.log("user.user_id", user.user_id)
      // console.log(this.state.userId)
    }).then(this.getPermitted)
  }

  taskNameChange = (value) => {
    this.setState({
      task_name: value
    })
    // console.log(this.state.task_name)
  }

  taskItem1Change = (value) => {
    this.setState({
      task_item_1: value
    })
    // console.log(this.state.task_item);
  }

  taskItem2Change = (value) => {
    this.setState({
      task_item_2: value
    })
    // console.log(this.state.task_item);
  }

  taskItem3Change = (value) => {
    this.setState({
      task_item_3: value
    })
    // console.log(this.state.task_item);
  }

  taskItem4Change = (value) => {
    this.setState({
      task_item_4: value
    })
    // console.log(this.state.task_item);
  }

  taskItem5Change = (value) => {
    this.setState({
      task_item_5: value
    })
    // console.log(this.state.task_item);
  }

  dateChange = (value) => {
    this.setState({
      date: value
    })
    // console.log(this.state.date)
  }

  timeChange = (value) => {
    this.setState({
      time: value
    })
    // console.log(this.state.time);
  }

  getPermitted = () => {
    fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks_permission/userPermitted/' + `${this.state.userId}`).then(res => res.json()).then(response => {
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

  addTask = () => {
    console.log(this.state.task_name);
    console.log(this.state.task_item_1, this.state.task_item_2, this.state.task_item_3,  this.state.task_item_4, this.state.task_item_5);
    console.log(this.state.date);
    console.log(this.state.time);
    fetch("https://fast-depths-36909.herokuapp.com/api/v1/tasks/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task_name: this.state.task_name,
        app_users_id: this.state.userId,
        date: this.state.date,
        time: this.state.time
      })
    })
    .then(res => res.json())
    .then(response => {
      console.log(response);
      }
    )
    .catch(error => {
      console.log("failure");
      console.error(error);
    })
  }

  render () {
    return(
      <View>
        <Header />
        <View style={styles.myView}>
          <Text style={styles.signUp}>Add Task</Text>
          <TextInput style={styles.textInput}
            placeholder='Task Name'
            value={this.state.task_name}
            onChangeText={(value)=> this.taskNameChange(value)}
          />
          <TextInput style={styles.textInput}
            placeholder='Due Date'
            value={this.state.date}
            onChangeText={(value)=> this.dateChange(value)}
          />
          <TextInput style={styles.textInput}
            placeholder='Time'
            value={this.state.time}
            onChangeText={(value)=> this.timeChange(value)}
          />
          <TextInput style={styles.textInput}
            placeholder='Steps One'
            value={this.state.task_item_1}
            onChangeText={(value)=> this.taskItem1Change(value)}
          />
          <TextInput style={styles.textInput}
            placeholder='Steps Two'
            value={this.state.task_item_2}
            onChangeText={(value)=> this.taskItem2Change(value)}
          />
          <TextInput style={styles.textInput}
            placeholder='Steps Three'
            value={this.state.task_item_3}
            onChangeText={(value)=> this.taskItem3Change(value)}
          />
          <TextInput style={styles.textInput}
            placeholder='Steps Four'
            value={this.state.task_item_4}
            onChangeText={(value)=> this.taskItem4Change(value)}
          />
          <TextInput style={styles.textInput}
            placeholder='Steps Five'
            value={this.state.task_item_5}
            onChangeText={(value)=> this.taskItem5Change(value)}
          />
          <View style={styles.buttonBack}>
            <Button
              onPress={this.addTask}
              title="Add Task"
              accessibilityLabel="Add Task Button"
            />
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
    marginTop: 10,
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
    width: 200,
    padding: 5,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#e1dede'
  },
  toDot: {
    width: 15,
    height: 15
  },
  Dot: {
    width: 20,
    height: 20
  }
})

module.exports = AddTask
