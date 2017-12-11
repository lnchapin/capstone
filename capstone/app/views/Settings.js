import React, {Component} from 'react'
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, AsyncStorage, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'
import Sign_up from './Sign_up'

export default class Settings extends Component {
  constructor(){
    super()
    this.state = {
      emailValue:'',
      fNameValue: '',
      lNameValue: '',
      userId: -1
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('data')
      .then(res =>
        JSON.parse(res)
      )
      .then((user)=> {
        this.setState({userId: user.user_id})
      }
    )


  }
  updateUser = () => {
    fetch("https://fast-depths-36909.herokuapp.com/api/v1/users/`${this.state.userId}`", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.userId,
        first_name: this.state.fNameValue,
        last_name: this.state.lNameValue,
        email: this.state.emailValue
      })
    })
    .then(res => res.json())
    .then(response => {
      if(response.error){
        alert(response.error)
      } else {
        alert(response.message)
        this.setState({
          fNameValue: '',
          lNameValue: '',
          emailValue: ''
          })
      }

    })
    .catch(error => {
      console.log("failure");
      console.error(error);
    })
  }

  logoutUser = () => {
    AsyncStorage.removeItem('data');
  }



  onfNameChange = (value) => {
    this.setState({
      fNameValue: value
    })
  }

  onlNameChange = (value) => {
    this.setState({
      lNameValue: value
    })
  }

  onEmailChange = (value) => {
    this.setState({
      emailValue: value
    })
  }

  render (){
    return(
      <View>
        <Header />
        <View style={styles.myView}>
          <Text style={styles.signUp}>Update</Text>
          <TextInput style={styles.textInput}
            placeholder='First Name'
            value={this.state.fNameValue}
            onChangeText={(value)=> this.onfNameChange(value)}
          />
          <TextInput style={styles.textInput}
            placeholder='Last Name'
            value={this.state.lNameValue}
            onChangeText={(value)=> this.onlNameChange(value)}
          />
          <TextInput style={styles.textInput}
            placeholder='Email'
            value={this.state.emailValue}
            onChangeText={(value)=> this.onEmailChange(value)}
          />
          <View style={styles.buttonBack}>
            <Button
              onPress={this.updateUser}
              title="Update"
              accessibilityLabel="Update Button"
            />
          </View>
          <View style={styles.buttonBack}>
            <TouchableOpacity
              onPressIn={() => this.logoutUser}
              onPress={() => Actions.Sign_in()}
              >
            <Text style={styles.logout}>Log Out</Text>
            </TouchableOpacity>
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
  },
  logout: {
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#841584'
  }
})

module.exports = Settings
