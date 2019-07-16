import React, { Component } from 'react';
import {
    Modal,
    View,
    Text, 
    TextInput,
    DatePickerIOS,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity, 
    Alert,
} from 'react-native';
import moment from 'moment'
import { connect } from 'react-redux';
import { modificaDesc, modificaObs, salvarTarefas, modifica_addtask } from '../store/actions/Tarefas';


class TesteAddTarefa extends Component {

    _salvarTarefasAFazer(){
       
        if(!this.props.desc){
            Alert.alert('Dados inválidos', 'Informe uma descrição para a tarefa')
        }else{
            const desc = this.props.desc;
            const obs = this.props.obs;
            const nome = this.props.nome;
            this.props.salvarTarefas({ desc, obs, nome }); 
            //this.props.onSave()
        }
        
    }

    render() {
        return (
           <View>
                <View style={styles.container}>
                     <Text style={styles.header}> Nova Tarefa! </Text>
                     <TextInput placeholder="Descrição.." style={styles.input}
                        onChangeText={texto => this.props.modificaDesc( texto )}
                         />
                    <TextInput placeholder="Observações..." style={styles.input}
                        onChangeText={texto => this.props.modificaObs( texto )}
                         />
                     <Text style={styles.date}> {moment().locale('pt-br').format('ddd, D [de] MMMM HH:mm')} </Text>
                     <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Inicio')
                        }}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._salvarTarefasAFazer()}>
                            <Text style={styles.button}> Salvar </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Inicio')
                    }}>
                    <View style={styles.offset}></View>
                </TouchableOpacity>
            </View>
        )
    }
}


var styles = StyleSheet.create({
    container: {
       backgroundColor: 'white',
       justifyContent: 'space-between' 
    },
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',

    },
    button: {
        margin: 20,
        marginRight: 30,
        color: '#1631be',
    },
    header: {
        backgroundColor: '#084d6e',
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
        color: '#FFF'
    },
    input: { 
        width: '95%',
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6 
    },
    date: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10,
        textAlign: 'center'
    }
})





const mapStateToProps = state => (
    {
        desc: state.tarefasReducer.desc,
        obs: state.tarefasReducer.obs,
        nome: state.autenticacaoReducer.name,
    }
)


//export default Login

export default connect(mapStateToProps, { modificaDesc ,modificaObs, salvarTarefas })(TesteAddTarefa)