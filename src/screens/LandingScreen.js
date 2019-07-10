import React, { Component } from 'react';
import { View, Text, Image, ImageBackground,ActivityIndicator } from 'react-native';
import { Header } from 'react-navigation';
import Button from '../components/common/Button';
import { Facebook } from 'expo';
import * as firebase from 'firebase';
import LogoTitle from '../components/common/LogoTitle';


export default class LandingScreen extends Component {

  static navigationOptions = {
    title: 'Entry Screen',
    headerTitleStyle: { alignSelf: 'center', color: 'white' },
    headerStyle: {
    backgroundColor: '#5CA9C7',
    },
    //header : null
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }


 
  componentWillMount  ()  {
    firebase.auth().onAuthStateChanged(user =>{

      this.setState({
        loading: false
      });

      if (user != null){
        this.props.navigation.replace('Profile')
      }
    });
  };


  

  async FacebookLogin() {
    // First we connect with facebook to get user data 
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('460854327792237', {
      permission: 'public_profile',
    });

    if (type == 'success') {
      // First we create credential
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const facebookProfile = await firebase.auth().signInWithCredential(credential);
      console.log('facebookProfile ', facebookProfile);

      const userID = facebookProfile.user.uid;

      firebase.database().ref('users/' + userID).set({
        name: facebookProfile.user.displayName,
        email: facebookProfile.user.email,
        photo: facebookProfile.user.photoURL
      })

      firebase.auth().onAuthStateChanged(user =>{
        if (user != null){
          console.log('We are athenticated now !!',user);
          this.props.navigation.replace('Profile');
        }
      });

    }

  }

  render() {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


        <ImageBackground

          style={{ flex: 1 }}
          blurRadius={1}
          source={require('C:/Repos/AuthApp/assets/code.jpg')}  >

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: 100, height: 100, marginTop: 10, borderRadius: 50 }}
              source={require('C:/Repos/AuthApp/assets/icon.png')}
            />
            <Text style={{ margin: 40, fontFamily: 'sans-serif-condensed', fontWeight: 'bold', fontSize: 20, color: 'white' }}> Select any option to enter : </Text>
            <Button onPress={() => this.FacebookLogin()} backgroundcolor='#4267B2' title={'LogIn with facebook'}></Button>
            <Button onPress={()=> this.props.navigation.navigate('SignIn')} backgroundcolor='#1D7791' title={'LogIn with Email'}></Button>
            <Button onPress={()=> this.props.navigation.navigate('SignUp')} backgroundcolor='#2E95B4' title={'SignUp with Email'}></Button>

          </View>

        </ImageBackground>

      </View>
    );
  }
}
