import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StyleSheet, Picker, Modal, TouchableHighlight } from 'react-native';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import * as firebase from 'firebase';

 

export default class SignUpScreen extends Component {



  static navigationOptions = {
    title: 'SignUp Screen',
    headerTitleStyle: { alignSelf: 'center', color: 'white' },
    headerStyle: {
    backgroundColor: '#4267B2',
    },
  };


  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      gender: '',
      firstName: '',
      lastName: '',
      age: '',
      emailError: null,
      passwordError: null,
      firstNameError: null,
      lastNameError: null,
      errorTotal: '',
      //edit
      pickerSelection: 'Default value!',
      pickerDisplayed: false,
      //edit
      pickerSelectionAge: 'Default value!',
      pickerDisplayedAge: false,
    };
  }

  handleEmail = (text) => {
    this.setState({
      email: text
    })
  }
  handlePassword = (text) => {
    this.setState({
      password: text
    })
  }
  handleFirstName = (text) => {
    this.setState({
      firstName: text
    })
  }
  handleLastName = (text) => {
    this.setState({
      lastName: text
    })
  }
  handleAge = (text) => {
    this.setState({
      age: text
    })
  }
  handleGender = (text) => {
    this.setState({
      gender: text
    })
  }

  handleInput = (key, value) => {
    console.log(key, value)
    this.setState({
      [key]: value,
    })
  }

  handleError = (text) => {
    this.setState({
      errorTotal: text
    })
  }


  checkEmail = () => {
    const { email } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(email).toLowerCase())

    //console.log ('Is valid ',isValid);

    if (!isValid) {
      this.setState({
        emailError: 'Invalid Email'
      })
    }
  }

  checkPassword = () => {
    const { password } = this.state;
    const re = /^((?=.*[a-z])(?=.{6,}))/; //at least a lower case letter with 6 or longer

    const isValid = re.test(String(password))

    //console.log ('Is valid ',isValid);

    if (!isValid) {
      this.setState({
        passwordError: 'Invalid Password'
      })
    }
  }

  checkFirstName = () => {
    const { firstName } = this.state;
    const re = /^[A-Za-z]+$/;

    const isValid = re.test(String(firstName))

    //console.log ('Is valid ',isValid);

    if (!isValid) {
      this.setState({
        firstNameError: 'Invalid First Name'
      })
    }
  }
  checkLastName = () => {
    const { lastName } = this.state;
    //const re = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/; 
    const re = /^[A-Za-z]+$/;

    const isValid = re.test(String(lastName))

    //console.log ('Is valid ',isValid);

    if (!isValid) {
      this.setState({
        lastNameError: 'Invalid Last Name'

      })
    }
  }

  signUpUser = () => {
    const { email, password, firstName, lastName, age, gender} = this.state;
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {

          const userID = user.user.uid;
          firebase
            .database()
            .ref('users/' + userID)
            .set({
              firstName: firstName,
              lastName: lastName,
              age: age,
              gender: gender,

            })
            .signInWithEmailAndPassword(email, password)
            this.props.navigation.replace('Profile');
          if (user) {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Profile' })],
            });
            this.props.navigation.dispatch(resetAction);

          }

        }

        )
        .catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              alert('Email already in use !')
              break;
            case 'auth/invalid-email':
              alert('Invalid email !')
              break;
          }
        })


    }
    catch (err) {
      alert("Error : ", err);
    }

  }
 
  setPickerValue(newValue) {
    this.setState({
      pickerSelection: newValue,
    })

    this.togglePicker();
  }
  
  setGenderValue(newValue){
    this.setState({
      gender : newValue
    })
  }

  togglePicker() {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed
    })
  }

  setPickerValueAge(newValue) {
    this.setState({
      pickerSelectionAge: newValue,
    })

    this.togglePickerAge();
  }
  
  setAgeValue(newValue){
    this.setState({
      age : newValue
    })
  }

  togglePickerAge() {
    this.setState({
      pickerDisplayedAge: !this.state.pickerDisplayedAge
    })
  }


  render() {
    const pickerValues = [
      {
        title: 'Female',
        value: 'Female'
      },
      {
        title: 'Male',
        value: 'Male'
      },
      {
        title: 'Other',
        value: 'Other'
      }
    ]

    const pickerValuesAge = [
      {
        title: '20',
        value: '20'
      },
      {
        title: '21',
        value: '21'
      },
      {
        title: '22',
        value: '22'
      },
      {
        title: '23',
        value: '23'
      },
      {
        title: '24',
        value: '24'
      },
      {
        title: '25',
        value: '25'
      },
      {
        title: '26',
        value: '26'
      },
      {
        title: '27',
        value: '27'
      },
      {
        title: '28',
        value: '28'
      }
    ]

    console.log('states ', this.state)
    return (

      <ScrollView style={{ flex: 1 ,backgroundColor:'#4267B2'}}>

        <View style={{ margin: 25, flexDirection: 'column', }}>
          <Input
            handleInput={(text) => this.handleInput('email', text)}
            onBlur={this.checkEmail}
            error={this.state.emailError}
            placeholder="Email"
          />

          <Input
            secureTextEntry={true}
            handleInput={(text) => this.handleInput('password', text)}
            onBlur={this.checkPassword}
            error={this.state.passwordError}
            placeholder="Password"
          />

          <Input
            handleInput={(text) => this.handleInput('firstName', text)}
            placeholder="First name"
            onBlur={this.checkFirstName}
            error={this.state.firstNameError}
          />

          <Input
            handleInput={(text) => this.handleInput('lastName', text)}
            onBlur={this.checkLastName}
            error={this.state.lastNameError}
            placeholder="Last name"
          />

         
          <View style={styles.container}>
            <Text>Selected gender is : {this.state.pickerSelection}</Text>
            <Button onPress={() => this.togglePicker()} title={"Select your gender!"} />

            <Modal visible={this.state.pickerDisplayed} animationType={"slide"} transparent={true}>
              <View style={{
                margin: 20, padding: 20,
                backgroundColor: '#efefef',
                bottom: 20,
                left: 20,
                right: 20,
                alignItems: 'center',
                position: 'absolute'
              }}>
                <Text>Please pick a value</Text>
                {pickerValues.map((value, index) => {
                  return <TouchableHighlight key={index} onPress={() =>{ this.setPickerValue(value.value);this.setGenderValue(value.value)}} style={{ paddingTop: 4, paddingBottom: 4 }}>
                    {/* <Text onPress={() => this.handleGender()} >{value.title}</Text> */}
                    <Text>{ value.title }</Text>
                    
                  </TouchableHighlight>
                })}


                <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4 }}>
                  <Text style={{ color: '#999' }}>Cancel</Text>
                </TouchableHighlight>
              </View>
            </Modal>
          </View>


            <View style={styles.container}>
            <Text>Selected age is : {this.state.pickerSelectionAge}</Text>
            <Button onPress={() => this.togglePickerAge()} title={"Select your age!"} />

            <Modal visible={this.state.pickerDisplayedAge} animationType={"slide"} transparent={true}>
              <View style={{
                margin: 20, padding: 20,
                backgroundColor: '#efefef',
                bottom: 20,
                left: 20,
                right: 20,
                alignItems: 'center',
                position: 'absolute'
              }}>
                <Text>Please pick a value</Text>
                {pickerValuesAge.map((value, index) => {
                  return <TouchableHighlight key={index} onPress={() =>{ this.setPickerValueAge(value.value);this.setAgeValue(value.value)}} style={{ paddingTop: 4, paddingBottom: 4 }}>
                    <Text>{ value.title }</Text>                   
                  </TouchableHighlight>
                })}


                <TouchableHighlight onPress={() => this.togglePickerAge()} style={{ paddingTop: 4, paddingBottom: 4 }}>
                  <Text style={{ color: '#999' }}>Cancel</Text>
                </TouchableHighlight>
              </View>
            </Modal>
          </View>

  

          <Button onPress={this.signUpUser} backgroundcolor='#2E95B4' width="50" title="Sign Up"></Button>


        </View>

      </ScrollView>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});