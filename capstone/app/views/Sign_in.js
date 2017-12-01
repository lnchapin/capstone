import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';
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
            title="Don't have an account? Create On"
            accessibilityLabel="Don't have an account? Create On"
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
// AppRegistry.registerComponent('Sign_in', () => Capstone)
