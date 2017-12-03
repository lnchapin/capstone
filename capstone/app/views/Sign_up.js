import React, {Component} from 'react'
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Header from '../components/Header'

export default class Sign_up extends Component {
  constructor(){
    super()
    this.state = {
      emailValue:'',
      passwordValue:'',
      fNameValue: '',
      lNameValue: ''
    }
  }

  onfNameChange = (value) => {
    this.setState({
      fNameValue: value
    })
    console.log(this.state.fNameValue)
  }

  onlNameChange = (value) => {
    this.setState({
      lNameValue: value
    })
    console.log(this.state.lNameValue);
  }

  onEmailChange = (value) => {
    this.setState({
      emailValue: value
    })
    console.log(this.state.emailValue)
  }

  onPasswordChange = (value) => {
    this.setState({
      passwordValue: value
    })
    console.log(this.state.passwordValue);
  }

  signUpSubmit = () => {
    console.log(this.state.fNameValue);
    console.log(this.state.lNameValue);
    console.log(this.state.emailValue);
    console.log(this.state.passwordValue);
  }

  render (){
    return(
      <View>
        <Header />
        <View style={styles.myView}>
          <Text style={styles.signUp}>Sign Up</Text>
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
          <TextInput style={styles.textInput}
            placeholder='Password'
            value={this.state.passwordValue}
            onChangeText={(value)=> this.onPasswordChange(value)}
          />
          <View style={styles.buttonBack}>
            <Button
              onPress={this.signUpSubmit}
              title="Sign Up"
              accessibilityLabel="Sign Up Button"
            />
          </View>
          <Button
            onPress={() => Actions.Sign_in()}
            title="Already have an account? Log in"
            accessibilityLabel="Already have an account? Log in"
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

module.exports = Sign_up
