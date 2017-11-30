import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation'
import Sign_up from './Sign_up'

// const navigateAction = NavigationActions.navigate({
//   routeName: 'Profile',
//   params: {},
//   // navigate can have a nested navigate action that will be run inside the child router
//   action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
// })
// this.props.navigation.dispatch(navigateAction)

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
    console.log(Object.keys(this.props));
    const {navigate} = this.props.navigation || {}
    return(
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
          onPress={()=> navigate('SignUp')}
          title="Don't have an account? Create On"
          accessibilityLabel="Don't have an account? Create On"
        />
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
