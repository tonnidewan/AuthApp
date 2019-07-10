import React, { Component } from 'react';
import { View, Text ,TextInput} from 'react-native';

export default class Input  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borderColor : 'black',
      borderWidth : 1,
    };
  }

  handleBlur= () =>{
    this.setState({
      borderColor : 'black',
      borderWidth : 1,
    })
    if(this.props.onBlur) {
      this.props.onBlur();
    }
  }

  render() {
    const {placeholder,handleInput,secureTextEntry,customStyle,error}=this.props;
    const {borderColor,borderWidth} = this.state;
    return (
      <View style = {{flex : 1}}>
        <TextInput
          style={[{
            height : 40,
            borderRadius : 4,
            padding : 10,
            marginBottom : 10,
            borderColor,
            borderWidth,
          },customStyle]}
          autoCorrect ={false}
          autoCapitalize={'none'}
          placeholder ={placeholder}
          onChangeText={handleInput}
          secureTextEntry={secureTextEntry}
          onFocus={() => this.setState({borderColor : '#7A1842',borderWidth: 2})}
          onBlur={this.handleBlur}
        />
        {error && <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>{error}</Text>}
        
      </View>
    );
  }
}
