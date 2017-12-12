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
      name: '',
      date: '',
      time: '',
      taskItem1: '',
      taskItem2: '',
      taskItem3: '',
      taskItem4: '',
      taskItem5: ''
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData = () => {
    console.log('in getData')
    return fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks/' + this.props.id)
      .then(res => res.json())
      .then(response => {
        this.setState({tasks: response})
      })
      .then(() => {
        return fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks_list/task/' + this.props.id)
          .then(res => res.json())
          .then(response => {
            this.setState({tasks_list: response})
            console.log(response)
            console.log('state 30', this.state)
          })
          .catch(function(error) {
            console.log(error.message)
            throw error
          })
      })
      .catch(error => {
        console.log('failure')
        console.error(error)
      })
  }
  taskNameChange = value => {
    this.setState({name: value})
  }
  dateChange = value => {
    this.setState({date: value})
  }
  timeChange = value => {
    this.setState({time: value})
  }
  taskItem1Change = value => {
    this.setState({taskItem1: value})
  }
  taskItem2Change = value => {
    this.setState({taskItem2: value})
  }
  taskItem3Change = value => {
    this.setState({taskItem3: value})
  }
  taskItem4Change = value => {
    this.setState({taskItem4: value})
  }
  taskItem5Change = value => {
    this.setState({taskItem5: value})
  }
  showTextInputName = (callback) => {
    if (!this.state.editModeName) return <View />
    return (
      <View>
        <TextInput style={styles.textInput} placeholder="Task Name" onChangeText={value => this.taskNameChange(value)} />
        <Button onPress={this.taskNameFunction} title="Submit Name Change" accessibilityLabel="Submit Name Change Button" />
      </View>
    )
  }
  showTextInputDate = () => {
    if (!this.state.editModeDate) return <View />
    return (
      <View>
        <TextInput style={styles.textInput} placeholder="Date" onChangeText={value => this.dateChange(value)} />
        <Button onPress={this.taskDateFunction} title="Submit Date Change" accessibilityLabel="Submit Date Change Button" />
      </View>
    )
  }
  showTextInputTime = () => {
    if (!this.state.editModeTime) return <View />
    return (
      <View>
        <TextInput style={styles.textInput} placeholder="Time" onChangeText={value => this.timeChange(value)} />
        <Button onPress={this.taskTimeFunction} title="Submit Time Change" accessibilityLabel="Submit Time Change Button" />
      </View>
    )
  }
  showTextInputtaskItem1 = () => {
    if (!this.state.editMode1) return <View />
    return (
      <View>
        <TextInput style={styles.textInput} placeholder="Task Item" onChangeText={value => this.taskItem1Change(value)} />
        <Button onPress={this.taskItem1Function} title="Task Item Change" accessibilityLabel="Task Item Change Button" />
      </View>
    )
  }
  showTextInputtaskItem2 = () => {
    if (!this.state.editMode2) return <View />
    return (
      <View>
        <TextInput style={styles.textInput} placeholder="Task Item" onChangeText={value => this.taskItem2Change(value)} />
        <Button onPress={this.taskItem2Function} title="Task Item Change" accessibilityLabel="Task Item Change Button" />
      </View>
    )
  }
  showTextInputtaskItem3 = () => {
    if (!this.state.editMode3) return <View />
    return (
      <View>
        <TextInput style={styles.textInput} placeholder="Task Item" onChangeText={value => this.taskItem3Change(value)} />
        <Button onPress={this.taskItem3Function} title="Task Item Change" accessibilityLabel="Task Item Change Button" />
      </View>
    )
  }
  showTextInputtaskItem4 = () => {
    if (!this.state.editMode4) return <View />
    return (
      <View>
        <TextInput style={styles.textInput} placeholder="Task Item" onChangeText={value => this.taskItem4Change(value)} />
        <Button onPress={this.taskItem4Function} title="Task Item Change" accessibilityLabel="Task Item Change Button" />
      </View>
    )
  }
  showTextInputtaskItem5 = () => {
    if (!this.state.editMode5) return <View />
    return (
      <View>
        <TextInput style={styles.textInput} placeholder="Task Item" onChangeText={value => this.taskItem5Change(value)} />
        <Button onPress={this.taskItem5Function} title="Task Item Change" accessibilityLabel="Task Item Change Button" />
      </View>
    )
  }
  taskNameFunction = () => {
    let taskName = {
      id: this.props.id,
      task_name: this.state.name
    }
    return fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks/update/' + this.props.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskName)
    })
      .then(secResponse => {
        console.log(secResponse)
        alert('Name Changed')
        this.setState({name: ''})
      })
      .then(this.getData)
      .catch(error => {
        console.log('failure')
        console.error(error)
      })
  }
  taskDateFunction = () => {
    let taskDate = {
      id: this.props.id,
      date: this.state.date
    }
    return fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks/update/' + this.props.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskDate)
    })
      .then(secResponse => {
        console.log(secResponse)
        alert('Date Changed')
        this.setState({date: ''})
      })
      .catch(error => {
        console.log('failure')
        console.error(error)
      })
  }
  taskItem5Function = () => {
    console.log('in taskItem5Function')
    if (this.state.tasks_list[4] === undefined) {
      console.log('task item 5 undefined')
    } else {
      console.log('task item 5 defined')
    }
  }
  render() {
    return (
      <View>
        <Header />
        <Button
          onPress={() =>
            this.setState({
              editModeName: !this.state.editModeName
            })}
          title={this.state.tasks && this.state.tasks.length > 0 ? this.state.tasks[0].task_name : 'Not set'}
          accessibilityLabel="Update Button"
        />
        {this.showTextInputName()}
        <Button
          onPress={() =>
            this.setState({
              editModeDate: !this.state.editModeDate
            })}
          title={this.state.tasks && this.state.tasks.length > 0 ? this.state.tasks[0].date : 'Not set'}
          accessibilityLabel="Update Button"
        />
        {this.showTextInputDate()}
        <Button
          onPress={() =>
            this.setState({
              editModeTime: !this.state.editModeTime
            })}
          title={this.state.tasks && this.state.tasks.length > 0 ? this.state.tasks[0].time : 'Not set'}
          accessibilityLabel="Update Button"
        />
        {this.showTextInputTime()}
        <Button
          onPress={() =>
            this.setState({
              editMode1: !this.state.editMode1
            })}
          title={this.state.tasks_list && this.state.tasks_list.length > 0 ? this.state.tasks_list[0].task_item : 'Step 1 Not set'}
          accessibilityLabel="Update Button"
        />
        {this.showTextInputtaskItem1()}
        <Button
          onPress={() =>
            this.setState({
              editMode2: !this.state.editMode2
            })}
          title={this.state.tasks_list && this.state.tasks_list.length > 1 ? this.state.tasks_list[1].task_item : 'Step 2 Not set'}
          accessibilityLabel="Update Button"
        />
        {this.showTextInputtaskItem2()}
        <Button
          onPress={() =>
            this.setState({
              editMode3: !this.state.editMode3
            })}
          title={this.state.tasks_list && this.state.tasks_list.length > 2 ? this.state.tasks_list[2].task_item : 'Step 3 Not set'}
          accessibilityLabel="Update Button"
        />
        {this.showTextInputtaskItem3()}
        <Button
          onPress={() =>
            this.setState({
              editMode4: !this.state.editMode4
            })}
          title={this.state.tasks_list && this.state.tasks_list.length > 3 ? this.state.tasks_list[3].task_item : 'Step 4 Not set'}
          accessibilityLabel="Update Button"
        />
        {this.showTextInputtaskItem4()}
        <Button
          onPress={() =>
            this.setState({
              editMode5: !this.state.editMode5
            })}
          title={this.state.tasks_list && this.state.tasks_list.length > 4 ? this.state.tasks_list[4].task_item : 'Step 5 Not set'}
          accessibilityLabel="Update Button"
        />
        {this.showTextInputtaskItem5()}
      </View>
    )
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
