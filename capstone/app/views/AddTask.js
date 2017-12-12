import React, {Component} from 'react'
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, AsyncStorage, Image, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'
import Background from '../components/Background'

export default class AddTask extends Component {
  constructor(props){
    super(props)
    this.state = {
      task_name: '',
      task_item_1: '',
      task_item_2: '',
      task_item_3: '',
      task_item_4: '',
      task_item_5: '',
      task_id: -1,
      date: '',
      time: '',
      userId: -1
    }
  }

  componentDidMount() {
    // console.log("in component did mount");
    AsyncStorage.getItem('data').then(res => JSON.parse(res)).then((user) => {
      this.setState({userId: user.user_id})
      // console.log("user.user_id", user.user_id)
      // console.log(this.state.userId)
    })
    // .then(this.getPermitted)
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

  addTask = () => {
    return fetch("https://fast-depths-36909.herokuapp.com/api/v1/tasks/create", {
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
      this.setState({
        task_id: response.id[0],
      })

      let task_item_arr = [{
        task_id: this.state.task_id,
        task_item: this.state.task_item_1,
        done: false
      }, {
        task_id: this.state.task_id,
        task_item: this.state.task_item_2,
        done: false
      }, {
        task_id: this.state.task_id,
        task_item: this.state.task_item_3,
        done: false
      }, {
        task_id: this.state.task_id,
        task_item: this.state.task_item_4,
        done: false
      }, {
        task_id: this.state.task_id,
        task_item: this.state.task_item_5,
        done: false
      }]

    return fetch("https://fast-depths-36909.herokuapp.com/api/v1/tasks_list/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task_item_arr)
    })
  }).then(secResponse =>{
    console.log(secResponse)
    alert("Task Added")
    this.setState({
      task_name: '',
      task_item_1: '',
      task_item_2: '',
      task_item_3: '',
      task_item_4: '',
      task_item_5: '',
      task_id: -1,
      date: '',
      time: ''
    })}
  )
  .then(() => {
    this.props.getUserTasks()
    Actions.Home()
    console.log('After home:');
  })
    .catch(error => {
      console.log("failure");
      console.error(error);
    })
  }

  render () {
    return(
      <View>
      <Background>
        <Header />
        <View style={styles.myView}>
          <View style={styles.card}>
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
    marginTop: 10,
  },
  card: {
    backgroundColor: 'white',
    width: 300,
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 10
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
