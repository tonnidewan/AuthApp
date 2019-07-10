import React, { Component } from 'react';
import { View, Text,ImageBackground } from 'react-native';

export default class LogoTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={{flex : 1}}>
            <ImageBackground
                source={require('C:/Repos/AuthApp/assets/code.jpg')}
                style={{ width: '100%', height: '100%' }}
                blurRadius={1}
            />
        </View>
        
    );
  }
}
