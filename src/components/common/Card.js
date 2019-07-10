import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View 
        style ={styles.container}>{this.props.children}
      </View>
    );
  }
}

const styles = {

    container :
    {
        margin : 10 ,
        overflow : "hidden",
        borderWidth : 1,
        borderColor : '#8CC25E',
        borderRadius : 8,
        shadowColor : '#75DB1B',
        shadowOffset: {width :0,height :2},
        shadowOpacity : 0.3,
        shadowRadius :2,
        elevation : 2
    }


}