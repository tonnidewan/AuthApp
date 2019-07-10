import React, { Component } from 'react';
import { View, Text,TouchableOpacity,Linking } from 'react-native';
import{Avatar} from 'react-native-elements';

export default class BadgeLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const {title,publisher,source_url,image_url}=this.props;

    return (
        <View style = {{margin:10,padding:20, flexDirection: 'row',justifyContent: 'center',
    }}>
 
       <Avatar
             rounded
             source={{ uri: image_url }}
             size="small"
           />
 
         <TouchableOpacity onPress={()=>Linking.openURL(source_url)} style={{ marginHorizontal: 10 }}>
           <Text
             style={{
               fontSize: 14,
               fontStyle: 'italic',
               color: 'green',
               textDecorationLine: 'underline'
             }} >
 
             {source_url}
 
           </Text>
         </TouchableOpacity>
 
       </View>
    );
  }
}
