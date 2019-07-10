import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class RecipeText extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const {title,publisher,titleStyle}=this.props;
    return (
        <View
        style={{
          marginTop: 10,
          marginLeft: 10,
          marginBottom: 10,
        }}>
        <Text style={[styles.title,titleStyle]} >Name -{title}</Text>
        <Text style={styles.publisher}>Publisher -{publisher}</Text>
      </View>
    );
  }
}

const styles = {

    title:{

        fontSize: 18,
        color: '#78BD00', 
        fontWeight: 'bold' 

    },
    publisher:{

        fontSize: 14,
        color: '#78BD00' 

    }



}