import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const {title,onPress,backgroundcolor,width} = this.props;
    return (
        <TouchableOpacity
        onPress ={onPress} 
        style =
          {
          [styles.container,{backgroundColor: backgroundcolor || '#0096D8'},{Width: width || 380} ]
          }>

           <Text style = {styles.titleStyle}>{title}</Text>
       </TouchableOpacity>
    );
  }
}

const styles = {

  container : {
    padding : 10,
    marginBottom: 10,
    marginTop: 10,
    width : 380,
    alignSelf:'center',
    borderRadius:15,
    backgroundColor:'red',

  },
    titleStyle : {
      color : '#fff',
      fontWeight : 'bold',
      textAlign : 'center'
    }
    
}