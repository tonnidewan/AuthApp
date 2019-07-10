import React, { Component } from 'react';
import { View, Text,ScrollView } from 'react-native';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import * as firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation';

export default class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : '',
      password : ''
    };
  }   
  
  handleInput = (key,value) => {
    console.log(key,value) 
    this.setState ({
      [key] : value,
    })
  }


  checkEmail = () => { 
    const { email } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email).toLowerCase())
    
 
    if(!isValid) {
      this.setState({
        emailError: 'Invalid Email'
      })
    }
  }

  signInUser = () =>{
    const {email,password}=this.state;

    try{
      firebase
    .auth()
    .signInWithEmailAndPassword(email,password)
    .then(user => {
      if (user){
       const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Profile' })],
      });
      this.props.navigation.dispatch(resetAction);

      }
      
    }).catch(error => {   
      switch(error.code) {
        case 'auth/invalid-email':
            alert('Invalid email !')
            break;
     }
   })

    }catch(err){
      alert("Error : ", err);
   }

    
  }

  render() {
 
    return (
      <ScrollView style={{flex : 1}}>


          <View style={{margin : 25 ,flexDirection : 'column'}}>
            <Input
             handleInput={(text) => this.handleInput('email',text)}
              onBlur={this.checkEmail}
              error={this.state.emailError}
              placeholder = "Email" 
              />
              
            <Input
             secureTextEntry={true}
             handleInput={(text) => this.handleInput('password',text)}
               placeholder = "Password"
                />

             <Button onPress={this.signInUser} backgroundcolor='black' width ="50" title = "Sign In"></Button>  
            
          </View>

          
          
        </ScrollView>
    );
  }
}
