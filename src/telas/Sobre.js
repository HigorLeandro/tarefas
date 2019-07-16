import React, { Component } from 'react'
import {StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class Sobre extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style = {styles.botaoMenu}>
                    <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name='bars' size={25} color='white'/>
                    </TouchableOpacity>
                    <Text style={{marginLeft: 5, fontSize: 20, color: 'white',   fontWeight: "bold"}}>Sobre</Text>
                </View>
                <Text style={styles.title}>O aplicativo Tarefas foi desenvolvido com o objetivo de controlar as atividades realizadas diariamente. Por meio da metodologia Kanbam ele permite que você tenha total controle 
                    sobre qualquer tarefa que esteja realizando, auxiliando assim para o ganho de tempo e produtividade.</Text>
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
    botaoMenu: {
        marginLeft: 10,
        marginTop: 10,
        flexDirection: 'row'
    }

})