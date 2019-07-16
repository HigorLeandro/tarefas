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
import { modificaDesc, modificaObs, salvarTarefasEmAndamento, modificaPrioridade } from '../store/actions/Tarefas';
import { ExcluirTarefaAFazer } from '../store/actions/TarefasAFazer';

class ModalExcluirTarefa extends Component {

    _excluiTarefa () {;
        const IdTarefa = this.props.uid;
        this.props.ExcluirTarefaAFazer({IdTarefa}); 
        this.props.onSave()
    }

    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide' transparent={true} >
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                         <View style={styles.offset}></View>
                </TouchableWithoutFeedback>    
                <View style={styles.container}>
                     <Text style={styles.header}> Excluir Tarefa! </Text>
                       <Text style={styles.tarefaPrioritaria}>Tem certeza que deseja excluir a tarefa?</Text>
                       <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._excluiTarefa()}>
                            <Text style={styles.button}> Excluir </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
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
        backgroundColor: '#FF0000',
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
        textAlign: 'center'
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
        uid: state.tarefasReducer.uid,
    }
)


//export default Login

export default connect(mapStateToProps, { modificaDesc ,modificaObs, salvarTarefasEmAndamento,modificaPrioridade,ExcluirTarefaAFazer })(ModalExcluirTarefa)