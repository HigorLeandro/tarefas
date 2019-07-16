import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity}  from 'react-native'
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/FontAwesome'

class Inicio extends Component {
    render(){
        return(
            <View style = {styles.container} >
                  <View style = {styles.background}>
                    <View style = {styles.botaoMenu}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='bars' size={25} color='white'/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Escolha qual lista de tarefas deseja acompanhar.</Text>
                        <Text style={styles.subtitle}>

                            {moment().locale('pt-br').format('ddd, D [de] MMMM HH:mm')}
                        </Text>
                                  
                    </View>
                </View>
                <View style={styles.escolha}>
                    <View style={styles.emAndamento}>
                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate('Afazer')
                                            }}>
                                <Text style={styles.button}> A fazer  </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emAndamento}>
                        <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate('EmAndamentoPrioritario')
                                            }}>
                                <Text style={styles.button}> Em Andamento (Prioritárias) </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emAndamento}>
                                <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate('EmAndamentoSemPrioridade')
                                            }}>
                                <Text style={styles.button}> Em Andamento (Sem Prioridade) </Text>
                            </TouchableOpacity>
                    </View>
                    <View style={styles.emAndamento}>
                                <TouchableOpacity onPress={() => {
                                                this.props.navigation.navigate('TarefasConcluidas')
                                            }}>
                                <Text style={styles.button}> Concluídas  </Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        backgroundColor: '#084d6e',

    },
    background: {
        //flex: 2.2,  
       // width: '100%',
        backgroundColor: '#084d6e',
        borderBottomWidth: 1,
        borderColor: '#778899',   
       
    },
    button: {
        marginTop: 20,
     
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#084d6e',
     
        
       
    },
    emAndamento: {
         //  flex: 2,
        //marginTop: 10,
        backgroundColor: '#084d6e',
        borderRadius: 10,
 
     
    },
  
    botaoMenu: {
        marginLeft: 20,
        marginTop: 10

    },
    titleBar: {
        //flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        color: "#FFF",
        fontSize: 25,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        marginTop: 30
    },
    subtitle: {
        color: "#FFF",
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 4
    },  
    escolha: {
      
        backgroundColor: '#084d6e',
        marginTop: 5
    }


})


export default Inicio