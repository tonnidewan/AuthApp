import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigation from './src/AppNavigation';
import * as firebase from 'firebase';

export default class App extends React.Component {

  componentWillMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyAzaV4tawPsA9BUkzybrpxKWiWkHEXFcs8",
      authDomain: "authapp-e6d55.firebaseapp.com",
      databaseURL: "https://authapp-e6d55.firebaseio.com",
      projectId: "authapp-e6d55",
      storageBucket: "authapp-e6d55.appspot.com",
      messagingSenderId: "467520293709",
      appId: "1:467520293709:web:099313ceae3cf942"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <AppNavigation/>
    );
  }
}
