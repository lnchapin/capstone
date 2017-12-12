import React, {Component} from 'react'
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, AsyncStorage, Image, TouchableOpacity, ScrollView} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'
import Dot from '../images/primitive-dot.png'

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editModeName: false,
      editModeDate: false,
      editModeTime: false,
      editMode1: false,
      editMode2: false,
      editMode3: false,
      editMode4: false,
      editMode5: false,
      userId: -1,
      taskId: -1,
      tasks: [],
      tasks_list: [],
      time: ''
    }
  }

  componentDidMount() {
    return fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks/' + this.props.id).then(res => res.json()).then(response => {
      this.setState({
        tasks: response
      })
    })
    .then(() => {
      return fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks_list/task/' + this.props.id)
      .then(res => res.json())
      .then(response => {
        this.setState({tasks_list: response})
        console.log(response);
        console.log("state 30", this.state);
      })
      .catch(function(error) {
        console.log(error.message)
        throw error;
      });
    })
    .catch(error => {
      console.log("failure");
      console.error(error);
    })
    }

    displayUserTasks = () => {
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

    timeChange = (value) => {
      this.setState({
        time: value
      })
      // console.log(this.state.task_name)
    }

  showTaskBreakdown = (val) => {
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
        <TextInput style={styles.textInput}
          placeholder='Task Name'
          value={task_item.task_item}
          onChangeText={(value)=> this.taskNameChange(value)}
        />
      </View>
    )

    showTextInputName = () =>{
      if (!this.state.editModeName) return <View />
      return <View>
        <TextInput style={styles.textInput}
          placeholder='Task Name'
          // value={task_item.task_item}
          onChangeText={(value)=> this.taskNameChange(value)}
        />
      </View>
    }

    showTextInputDate = () =>{
      if (!this.state.editModeDate) return <View />
      return <View>
        <TextInput style={styles.textInput}
          placeholder='Date'
          // value={task_item.task_item}
          onChangeText={(value)=> this.taskNameChange(value)}
        />
      </View>
    }

    showTextInputTime = () =>{
      if (!this.state.editModeTime) return <View />
      return <View>
        <TextInput style={styles.textInput}
          placeholder='Time'
          // value={task_item.task_item}
          onChangeText={(value)=> this.timeChange(value)}
        />
        <Button
          onPress={() => console.log(this.state.time)}
          title="Submit Time Change"
          accessibilityLabel="Submit Time Change Button"
        />

      </View>
    }

  render() {
    console.log(this.props)
    console.log(this.state.tasks);
    console.log(this.state.tasks_list);
    return (
      <View>
      <Header/>
      <Button
        onPress={() => this.setState({editModeName: !this.state.editModeName})}
        title={this.state.tasks && this.state.tasks.length > 0 ? this.state.tasks[0].task_name : 'Not set'}
        accessibilityLabel="Update Button"
      />
      {this.showTextInputName()}
      <Button
        onPress={() => this.setState({editModeDate: !this.state.editModeDate})}
        title={this.state.tasks && this.state.tasks.length > 0 ? this.state.tasks[0].date : 'Not set'}
        accessibilityLabel="Update Button"
      />
      {this.showTextInputDate()}
      <Button
        onPress={() => this.setState({editModeTime: !this.state.editModeTime})}
        title={this.state.tasks && this.state.tasks.length > 0 ? this.state.tasks[0].time : 'Not set'}
        accessibilityLabel="Update Button"
      />
      {this.showTextInputTime()}
  </View>)
  }
}

const styles = StyleSheet.create({
  myView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  taskBack: {
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
  },
  Done: {
    textDecorationLine: 'line-through'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
    marginTop: 5,
    marginBottom: 25
},
  button: {
    borderRadius: 10,
    width: '40%',
    height: 40
}
})

module.exports = Modal
