import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Sign_up from './Sign_up'
import Header from '../components/Header'


export default class Sign_in extends Component {
  constructor(){
    super()
    this.state = {
      emailValue:'',
      passwordValue:''
    }
  }



  onEmailChange = (value) =>{
    this.setState({
      emailValue: value
    })
    console.log(this.state.emailValue)
  }

  onPasswordChange = (value) =>{
    this.setState({
      passwordValue: value
    })
    console.log(this.state.passwordValue);
  }

  signInSubmit = () => {
    console.log(this.state.emailValue, this.state.passwordValue);

    fetch("https://fast-depths-36909.herokuapp.com/api/v1/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.emailValue,
        password: this.state.passwordValue
      })
    })
    .then(response => {
      console.log(response);
      console.log(response.status);
      if(response.status == 40){
        alert('Email not found, please sign up')
      } else {
        AsyncStorage.setItem('token', response.token)
        AsyncStorage.setItem('app_users_id', response.user_id)
        console.log("Async", AsyncStorage);
      }
    })
    .catch(error => {
      console.log("failure");
      console.error(error);
    })
  }

  render (){
    return(
      <View>
        <Header />
        <View style={styles.myView}>
          <Text style={styles.signIn}>Sign In</Text>
          <TextInput style={styles.textInput}
            placeholder='Email'
            value={this.state.emailValue}
            onChangeText={(value)=> this.onEmailChange(value)}
          />
          <TextInput style={styles.textInput}
            placeholder='Password'
            value={this.state.passwordValue}
            onChangeText={(value)=> this.onPasswordChange(value)}
          />
          <View style={styles.buttonBack}>
            <Button
              onPress={this.signInSubmit}
              title="Sign In"
              accessibilityLabel="Sign In Button"
            />
          </View>
          <Button
            onPress={() => Actions.Sign_up()}
            title="Don't have an account? Create One"
            accessibilityLabel="Don't have an account? Create One"
          />
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
    marginTop: 200,
  },
  signIn: {
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

module.exports = Sign_in
