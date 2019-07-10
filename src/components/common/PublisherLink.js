import React, { Component } from 'react';
import { View, Text,TouchableOpacity,Linking  } from 'react-native';


export default class PublisherLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {


    const {title,publisher,source_url,image_url,publisher_url}=this.props;

    return (
        <View >

        <Text
          
          style={{
            margin: 10,
            color:'green',
            fontWeight:'bold',
            fontSize: 16,
            //marginBottom: 10
            }} >
              
              Click below for publisher website :
            
        </Text>
  
  
        <TouchableOpacity onPress={()=>Linking.openURL(publisher_url)} style={{ marginHorizontal: 55}}>
          <Text
            style={{
              fontSize: 14,
              fontStyle: 'italic',
              color: 'green',
              textDecorationLine: 'underline'
            }} >
  
            {publisher_url}
  
          </Text>
        </TouchableOpacity>
  
  
  
        </View>
    );
  }
}
