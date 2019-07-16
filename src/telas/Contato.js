import React, { Component } from 'react'
import {StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class Contato extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style = {styles.botaoMenu}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name='bars' size={25} color='white'/>
                    </TouchableOpacity>
                    <Text style={{marginLeft: 5, fontSize: 20, color: 'white',   fontWeight: "bold"}}>Contato</Text>
                </View>
                  <Text style={styles.title}>Possíves dúvidas, críticas, sugestões de novas funcionalidades podem ser feitas entrando em contato pelos seguintes meios:</Text>
                  <View style={styles.comum}>
                    <Icon style={styles.email} name='at' size={20} color='white'>
                        <Text style={styles.mensagem}> contatotarefas@gmail.com</Text>
                    </Icon>
                  </View>
                  <Icon style={styles.wpp} name='whatsapp' size={20} color='white'>
                     <Text style={styles.mensagem}> (35) 99898-9335</Text>    
                  </Icon>
         
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
       
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#084d6e'
    }, 
    title: {
        marginTop: 15,
        marginLeft: 10,
        color: '#FFF',
        fontSize: 15,
        marginBottom: 10,
        marginRight: 10
    },
    email: {
        marginLeft: 10,
    },
    mensagem: {
        marginTop: 5,
        marginLeft: 10,
    },
    mensagem: {
        marginLeft: 8,
        fontSize: 15
    },
    wpp: {
        marginTop: 5,
        marginLeft: 10,
    },
    botaoMenu: {
        marginLeft: 10,
        marginTop: 10,
        flexDirection: 'row'
    }

})