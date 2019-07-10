import React, { Component } from 'react';
import { View, Text ,ImageBackground} from 'react-native';
import * as firebase from 'firebase';
import Button from '../components/common/Button';


export default class ProfileScreen extends Component {

  static navigationOptions = {
    title: 'Profile Screen',
    headerTitleStyle: { alignSelf: 'center', color: 'white' },
    headerStyle: {
    backgroundColor: 'black',
    },
  };

  componentDidMount() {
    let userId = firebase.auth().currentUser.uid;
    return firebase
    .database()
    .ref('/users/' + userId)
    .once('value')
    .then(function (snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      console.log('snapshot',snapshot.val());
    });
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shiftScreen = () => {
    this.props.navigation.replace('Landing');
  }


  render() {
    return (
      <ImageBackground

          style={{ flex: 1 }}
          blurRadius={1}
          source={require('C:/Repos/AuthApp/assets/vanish.gif')}  >
      <View style={{flex:1,justifyContent:'flex-end'}} >
        <Text > Profile screen </Text>
        <Button title="Sign Out" onPress={() => { firebase.auth().signOut(); this.shiftScreen() }}></Button>
      </View>
      </ImageBackground>
    );
  }
}
