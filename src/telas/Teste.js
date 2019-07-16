import React, { Component } from 'react'
import { View, Text,TouchableHighlight  } from 'react-native'




export default class Teste extends Component {

    
       
    
 

    render(){

        const {} = this.props;
     

        return (
            
            <View style={{ marginTop: 80}}>
                <Text> Estamos aqui</Text>
               
                <Text> {}</Text>
            <TouchableHighlight
                        onPress={() => {
                        this.props.navigation.navigate('Inicio')}}>
                        <Text > Voltar </Text>
                    </TouchableHighlight>
            </View>
        )
    }
}