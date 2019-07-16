import React, { Component } from 'react';
import {
    Modal,
    View,
    Text, 
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity, 
    Alert,
    Picker
} from 'react-native';
import moment from 'moment'
import { connect } from 'react-redux';
import { modificaDesc, modificaObs, salvarTarefas,modificaPrioridade } from '../store/actions/Tarefas';



class AddTarefasAFazer extends Component {

    _salvarTarefasAFazer(){
        if( !this.props.desc.trim()){
            Alert.alert('Dados inválidos', 'Informe uma descrição para a tarefa')
        }else{
            const desc = this.props.desc;
            const obs = this.props.obs;
            const nome = this.props.nome;
            const prioritaria = this.props.prioritaria
            this.props.salvarTarefas({ desc, obs, nome, prioritaria }); 
            this.props.onSave()
        }
        
    }

    _resetaValor(){
        this.props.modificaDesc('')
        this.props.modificaObs('')
        this.props.modificaPrioridade('Não')
        this.props.onCancel();
    }

    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={true} >
                <TouchableWithoutFeedback onPress={() => this._resetaValor()}>
                         <View style={styles.offset}></View>
                </TouchableWithoutFeedback>    
                <View style={styles.container}>
                     <Text style={styles.header}> Nova Tarefa! </Text>
                     <TextInput placeholder="Descrição.." style={styles.input}
                        onChangeText={texto => this.props.modificaDesc( texto )}
                        value={this.props.desc} />
                    <TextInput placeholder="Observações..." style={styles.input}
                        onChangeText={texto => this.props.modificaObs( texto )}
                        value={this.props.obs} />
                     <Text style={styles.tarefaPrioritaria}>Tarefa Prioritária?</Text>
                     <Picker
                         style={styles.picker}
                        selectedValue={this.props.prioritaria}
                        onValueChange={texto => this.props.modificaPrioridade(texto)}
                     >
                         <Picker.Item  color= '#708090' label = 'Não' value='Não' />
                         <Picker.Item  color= '#708090' label = 'Sim' value='Sim' />
                    
                     </Picker>
                     <Text style={styles.date}> {moment().locale('pt-br').format('ddd, D [de] MMMM HH:mm')} </Text>
                     <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity onPress={() => this._resetaValor()}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._salvarTarefasAFazer()}>
                            <Text style={styles.button}> Salvar </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableWithoutFeedback onPress={() =>  this._resetaValor()}
                >
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
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
    picker: {
        marginLeft: 10,
        marginRight: 10
    },
    tarefaPrioritaria: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 18,
        backgroundColor: 'white',
    },
    date: {
        fontSize: 20,
        marginLeft: 10,
        marginTop: 2,
        textAlign: 'center'
    }
})





const mapStateToProps = state => (
    {
        desc: state.tarefasReducer.desc,
        obs: state.tarefasReducer.obs,
        nome: state.autenticacaoReducer.name,
        prioritaria: state.tarefasReducer.prioritaria
    }
)


//export default Login

export default connect(mapStateToProps, { modificaDesc ,modificaObs, salvarTarefas,modificaPrioridade, modificaPrioridade })(AddTarefasAFazer)