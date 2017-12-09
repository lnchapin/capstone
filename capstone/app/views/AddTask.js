import React, {Component} from 'react'
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, AsyncStorage, Image, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'

export default class AddTask extends Component {
  constructor(){
    super()
    this.state = {
      task_name:'',
      task_item: [],
      label_id: [],
      date: '',
      time: '',
      active: true,
      userId: -1,
      task_permission: []
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

  taskItemChange = (value) => {
    this.setState({
      task_item: value
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

  displayUsersYouPermitted = () => {
    return this.state.task_permission.map(task_permission =>
      <View key={task_permission.id} style={styles.taskBack}>
        <Text>
          <TouchableOpacity
          onPress={() => this.addPermittedUser(task_permission.user_id_permitted)}
          style={styles.toDot}>
          <Image style={styles.Dot} source={require('../images/primitive-dot.png')} />
        </TouchableOpacity>
        {task_permission.first_name + ' ' + task_permission.last_name}</Text>
      </View>
    )
  }

  addPermittedUser = (id) =>{
    this.state.label_id.push(id)
    // console.log(this.state.label_id);
  }

  signUpSubmit = () => {
    // console.log(this.state.task_name);
    // console.log(this.state.task_item);
    // console.log(this.state.date);
    // console.log(this.state.time);
    // fetch("https://fast-depths-36909.herokuapp.com/api/v1/users/signup", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     first_name: this.state.fNameValue,
    //     last_name: this.state.lNameValue,
    //     email: this.state.emailValue,
    //     password: this.state.passwordValue
    //   })
    // })
  //   .then(res => res.json())
  //   .then(response => {
  //     console.log(response);
  //     console.log(response.status);
  //     if(response.status == 404){
  //       alert('Email not found, please sign up')
  //     } else if (response.status == 401) {
  //       alert('Email already in use, please log in')
  //     } else {
  //       AsyncStorage.setItem('data', JSON.stringify(response))
  //       AsyncStorage.getItem('data').then((res)=>console.log("getItem", res))
  //       Actions.Home()
  //     }
  //   })
  //   .catch(error => {
  //     console.log("failure");
  //     console.error(error);
  //   })
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
            value={this.state.time}
            onChangeText={(value)=> this.timeChange(value)}
          />
          <TextInput style={styles.textInput}
            placeholder='Steps Two'
            value={this.state.time}
            onChangeText={(value)=> this.timeChange(value)}
          />
          <TextInput style={styles.textInput}
            placeholder='Steps Three'
            value={this.state.time}
            onChangeText={(value)=> this.timeChange(value)}
          />
          <TextInput style={styles.textInput}
            placeholder='Steps Four'
            value={this.state.time}
            onChangeText={(value)=> this.timeChange(value)}
          />
          <TextInput style={styles.textInput}
            placeholder='Steps Five'
            value={this.state.time}
            onChangeText={(value)=> this.timeChange(value)}
          />
          <Text>Who Do You Want to Share This With?</Text>
          {this.displayUsersYouPermitted()}
          <View style={styles.buttonBack}>
            <Button
              onPress={this.signUpSubmit}
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
