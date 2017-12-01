Error.stackTraceLimit = 40
import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { Actions, Router, Scene, Tabs } from 'react-native-router-flux'
import Header from './app/components/Header'
import Sign_in from './app/views/Sign_in'
import Sign_up from './app/views/Sign_up'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene  key="root">
           <Scene key="Sign_in" hideNavBar={true} component={Sign_in} initial={true} />
           <Scene key="Sign_up" hideNavBar={true} component={Sign_up} initial={false} />
     </Scene>
      </Router>
    );
  }
}


// class Sign_in extends Component {
//   static navigationOptions = {
//     title: 'Solanum'
//   }
//   constructor(){
//     super()
//     this.state = {
//       emailValue:'',
//       passwordValue:''
//     }
//   }
//
//   onEmailChange = (value) =>{
//     this.setState({
//       emailValue: value
//     })
//     console.log(this.state.emailValue)
//   }
//
//   onPasswordChange = (value) =>{
//     this.setState({
//       passwordValue: value
//     })
//     console.log(this.state.passwordValue);
//   }
//
//   signInSubmit = () => {
//     console.log(this.state.emailValue, this.state.passwordValue);
//   }
//
//   render (){
//     const {navigate} = this.props.navigation
//     return(
//       <View style={styles.myView}>
//         <Text style={styles.signIn}>Sign In</Text>
//         <TextInput style={styles.textInput}
//           placeholder='Email'
//           value={this.state.emailValue}
//           onChangeText={(value)=> this.onEmailChange(value)}
//         />
//         <TextInput style={styles.textInput}
//           placeholder='Password'
//           value={this.state.passwordValue}
//           onChangeText={(value)=> this.onPasswordChange(value)}
//         />
//         <View style={styles.buttonBack}>
//           <Button
//             onPress={this.signInSubmit}
//             title="Sign In"
//             accessibilityLabel="Sign In Button"
//           />
//         </View>
//         <Button
//           onPress={()=> navigate('SignUp')}
//           title="Don't have an account? Create On"
//           accessibilityLabel="Don't have an account? Create On"
//         />
//       </View>
//     )
//   }
// }
//
// // const styles = StyleSheet.create({
// //   myView: {
// //     justifyContent:'center',
// //     alignItems: 'center',
// //     padding: 5,
// //     marginTop: 200,
// //   },
// //   signIn: {
// //     fontWeight: '700',
// //     fontSize: 24
// //   },
// //   textInput: {
// //     fontSize: 20,
// //     width: 250,
// //     padding: 5,
// //     margin: 5,
// //     borderRadius: 10,
// //     backgroundColor: '#e1dede'
// //   },
// //   buttonBack: {
// //     width: 100,
// //     padding: 5,
// //     margin: 5,
// //     borderRadius: 10,
// //     backgroundColor: '#e1dede'
// //   },
// //   header: {
// //       paddingTop: 15,
// //       paddingBottom: 5,
// //       alignItems: 'center',
// //       backgroundColor: '#7ACDC1'
// //     },
// //     name:{
// //       fontSize: 24
// //     }
// // })
//
//
// class Sign_up extends Component {
//   static navigationOptions = {
//     headerTintColor: '#7ACDC1',
//     title: 'Solanum'
//   }
//   constructor(){
//     super()
//     this.state = {
//       emailValue:'',
//       passwordValue:'',
//       fNameValue: '',
//       lNameValue: ''
//     }
//   }
//
//   onfNameChange = (value) => {
//     this.setState({
//       fNameValue: value
//     })
//     console.log(this.state.fNameValue)
//   }
//
//   onlNameChange = (value) => {
//     this.setState({
//       lNameValue: value
//     })
//     console.log(this.state.lNameValue);
//   }
//
//   onEmailChange = (value) => {
//     this.setState({
//       emailValue: value
//     })
//     console.log(this.state.emailValue)
//   }
//
//   onPasswordChange = (value) => {
//     this.setState({
//       passwordValue: value
//     })
//     console.log(this.state.passwordValue);
//   }
//
//   signUpSubmit = () => {
//     console.log(this.state.fNameValue);
//     console.log(this.state.lNameValue);
//     console.log(this.state.emailValue);
//     console.log(this.state.passwordValue);
//   }
//
//   render (){
//     const {navigate} = this.props.navigation
//     return(
//       <View style={styles.myView}>
//         <Text style={styles.signUp}>Sign Up</Text>
//         <TextInput style={styles.textInput}
//           placeholder='First Name'
//           value={this.state.fNameValue}
//           onChangeText={(value)=> this.onfNameChange(value)}
//         />
//         <TextInput style={styles.textInput}
//           placeholder='Last Name'
//           value={this.state.lNameValue}
//           onChangeText={(value)=> this.onlNameChange(value)}
//         />
//         <TextInput style={styles.textInput}
//           placeholder='Email'
//           value={this.state.emailValue}
//           onChangeText={(value)=> this.onEmailChange(value)}
//         />
//         <TextInput style={styles.textInput}
//           placeholder='Password'
//           value={this.state.passwordValue}
//           onChangeText={(value)=> this.onPasswordChange(value)}
//         />
//         <View style={styles.buttonBack}>
//           <Button
//             onPress={this.signUpSubmit}
//             title="Sign Up"
//             accessibilityLabel="Sign Up Button"
//           />
//         </View>
//         {/* <Button
//           onPress={() => navigate ('Sign_in')}
//           title="Already have an account? Log in"
//           accessibilityLabel="Already have an account? Log in"
//         /> */}
//       </View>
//     )
//   }
// }
//
// const styles = StyleSheet.create({
//   myView: {
//     justifyContent:'center',
//     alignItems: 'center',
//     padding: 5,
//     marginTop: 150,
//   },
//   signUp: {
//     fontWeight: '700',
//     fontSize: 24
//   },
//   textInput: {
//     fontSize: 20,
//     width: 250,
//     padding: 5,
//     margin: 5,
//     borderRadius: 10,
//     backgroundColor: '#e1dede'
//   },
//   buttonBack: {
//     width: 100,
//     padding: 5,
//     margin: 5,
//     borderRadius: 10,
//     backgroundColor: '#e1dede'
//   }
// })
//
// export const AppView = StackNavigator ({
//   Home: {screen: Sign_in},
//   SignUp: {screen: Sign_up},
// })
