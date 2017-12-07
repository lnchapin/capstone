import React, {Component} from 'react'
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, AsyncStorage, Image, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'
import Dot from '../images/primitive-dot.png'

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
        <View style={styles.container}>
          <Button
            style={styles.button}
            onPress={() => console.log("hi")}
            title='Edit'
            accessibilityLabel="Edit Task Button"
          />
          <Button
            style={styles.button}
            onPress={() => console.log("hi")}
            title='Finish'
            accessibilityLabel="Finish Task Button"
          />
        </View>
      </View>
    )

  }

  showTaskBreakdown = (val) => {
    console.log("showTaskBreakdown val", val);
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
        <Text style={(task_item.done ? styles.Done : null)}>
          <TouchableOpacity
            onPress={() => this.finishTask(task_item)}
            style={styles.toDot}>
            <Image style={styles.Dot} source={require('../images/primitive-dot.png')} />
          </TouchableOpacity> {task_item.task_item} </Text>
      </View>
    )

    finishTask = ({task_id, id, done = false}) => {
      console.log("task_id in finish", task_id);
      console.log('state in finish', this.state);
      fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks_list/finished/' + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: id,
          done: !done
        })
      })
      .then(res => res.text())
      .then(response => {
        console.log(JSON.parse(response));
        if(response.error){
          alert(response.error)
        } else {
          console.log(response);
        }
        console.log("finish task id", id);
        return this.showTaskBreakdown(id)
    })
    .catch(function(error) {
      console.log("Put error", error.message);
      throw error;
    });
  }

    editTask = () => {
      console.log('edit');
    }


  render() {
    return (
      <View>
      <Header/>
      <Button
        style={styles.button}
        onPress={()=> Actions.AddTask()}
        title='Add Task'
        accessibilityLabel="Add Task Button"/>
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

module.exports = Home
