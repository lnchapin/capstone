import React, {Component} from 'react'
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'


let tasks = null;

export default class Settings extends Component {
  constructor(){
    super()
    this.state = {
      userId: -1
    }
  }

  componentDidMount(){
    console.log("in component did mount");
    AsyncStorage.getItem('data')
      .then(res =>
        JSON.parse(res)
      )
      .then((user)=> {
        this.setState({userId: user.user_id})
        console.log("user.user_id", user.user_id)
        console.log(this.state.userId)
      }
    )
      .then( () => {
      console.log("state at update", this.state);
      fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks/user/'+`${this.state.userId}`)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        tasks = response;
        for (var i = 0; i < response.length; i++) {
          console.log(response[i].task_name);
        }
      })
      .catch(error => {
        console.log("failure");
        console.error(error);
      })
    })
  }

  getUserTasks = () => {
    console.log("state at update", this.state);
    fetch('https://fast-depths-36909.herokuapp.com/api/v1/tasks/user/'+`${this.state.userId}`)
    .then(res => res.json())
    .then(response => {
      if(response.error){
        alert(response.error)
        console.log("if");
      } else {
        console.log("else");
        console.log(response);
      }

    })
    .catch(error => {
      console.log("failure");
      console.error(error);
    })
  }

  asyncCheck = () => {
    console.log(tasks);
      AsyncStorage.getItem('data').then((res)=>console.log("getItem", res));
      console.log(this.state.userId);
      console.log("attempt at id from url", `${this.state.userId}`)
      console.log('https://fast-depths-36909.herokuapp.com/api/v1/tasks/user/'+`${this.state.userId}`);
  }


  render (){
    return(
      <View>
        <Header />
        <View style={styles.myView}>
          <Text style={styles.signUp}>Tasks</Text>
          <View style={styles.buttonBack}>
            <Button
              onPress={this.getUserTasks}
              title="Get Tasks"
              accessibilityLabel="Get Tasks Button"
            />
          </View>
          <View style={styles.buttonBack}>
            <Button
              onPress={this.asyncCheck}
              title="Async Check"
              accessibilityLabel="Async Check Button"
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
    marginTop: 150,
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
    width: 100,
    padding: 5,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#e1dede'
  }
})

module.exports = Settings
