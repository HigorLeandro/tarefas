import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Alert, Platform, ListView} from 'react-native'
import moment from 'moment';
import 'moment/locale/pt-br';
import Tarefas from '../components/Tarefas'
import ActionButton from 'react-native-action-button';
import AddTarefasEmAndamento from './AddTarefasEmAndamento';
import Icon from 'react-native-vector-icons/FontAwesome'
import { tarefasUsuarioFetchEmAndamento } from '../store/actions/ListaTarefasEmAndamento';
import { ExcluirTarefaEmAndamento,concluiTarefa } from '../store/actions/TarefasEmAndamento';
import ModalExcluirTarefaEmAndamento from './ModalExcluirTarefaEmAndamento'
import _ from 'lodash';
import { modifica_addtask, modificaUID } from '../store/actions/Tarefas';
import { concluiTarefaReiniciada } from '../store/actions/ReiniciaFinalizaTarefa'



class EmAndamentoPrioritario extends Component {

    componentWillMount() {
        this.props.tarefasUsuarioFetchEmAndamento();
        this.criaFonteDeDados( this.props.tarefas )
      //  this.setState({ showAddTask: false })
     
    }
 
     componentWillReceiveProps(nextProps){
        
         this.criaFonteDeDados(nextProps.tarefas)
     }
 
     criaFonteDeDados( tarefas ){
         const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
      
         this.fonteDeDados = ds.cloneWithRows(tarefas)
     }
 

    state = {
        tasks: [
           
        ],
        showExcTask: false,
        showAddTask: false,
    }

    fechamodal = () => {
        this.setState({ showAddTask: false})
        this.setState({ showExcTask: false})
    }

    _excluirTarefaEmAndamento (uid) {
        const IdTarefa = uid;
        this.props.ExcluirTarefaEmAndamento({IdTarefa}); 
    }
    
    _concluitarefa (uid, desc, obs, usuario, dataInicioTarefa, tarefaPrioritaria,grauDaTarefa, 
                        dataReinicioTask, qtdDiasTask, qtdMinutosTast, qtdSegundosTask, taskReiniciada, qtdHorasTask) {

        const IdTarefa = uid;
        const descTarefa = desc;
        const obsTarefa = obs;
        const userTarefa = usuario;
        const dataTarefa = dataInicioTarefa;
        const  tarefaPr = tarefaPrioritaria;
        const grauTar = grauDaTarefa;
        const dataReinicioTarefa = dataReinicioTask;
        const qtdDias = qtdDiasTask;
        const qtdMinutos = qtdMinutosTast;
        const qtdSegundos = qtdSegundosTask;
        const tarefaReiniciada = taskReiniciada;
        const qtdHoras = qtdHorasTask;
        if(taskReiniciada == 'Nao'){
            this.props.concluiTarefa({IdTarefa, descTarefa, obsTarefa, userTarefa, dataTarefa, tarefaPr, grauTar}); 
        }else{
            this.props.concluiTarefaReiniciada({IdTarefa, descTarefa, obsTarefa, userTarefa, dataTarefa, tarefaPr, 
                    grauTar,dataReinicioTarefa,qtdDias,qtdMinutos,qtdHoras,qtdSegundos, tarefaReiniciada})
        }

     
       
      
       
    }

    atualizaId(id){
        this.props.idTarefa = this.props.modificaUID(id)  
    }

    obsTarefa(tarefas){
        if(tarefas.trim()){
            return(
                
                <Text style={styles.obs}>{tarefas}</Text>
            )
        }else{
            return(
                <Text style={styles.obs}>Sem observações...</Text>
            )
        }
    }
    /*
     return (             
    <View style={{ marginTop: 10}}>
                    <View style={styles.container2}>
                            <View style={styles.mantem}>
                                    <Text style={styles.desc}>{tarefas.descricao}</Text>
                                    <Text style={styles.obs}>{this.obsTarefa(tarefas.observacoes)}</Text>
                                    <Text style={styles.inicio}>Iniciado em: {tarefas.InicioTarefa}</Text>
                            </View>  
                            <View style={ { marginRight: 10}}>
                            <TouchableOpacity  style={styles.manter} onPress={() => this._concluitarefa(tarefas.uid, 
                                                                                                        tarefas.descricao, 
                                                                                                        tarefas.observacoes, 
                                                                                                        tarefas.nomeUsuario,
                                                                                                        tarefas.momemntInicial,
                                                                                                        tarefas.tarefaPrioritaria,
                                                                                                        tarefas.grauDaTarefa)}>
                                    <Icon name='check-circle' size={25} color='green'/>
                                    <Text style={ { marginTop: 3, marginLeft: 2}}>Concluir</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  style={styles.manter2} onPress={() => { this.setState({ showExcTask: true }), this.atualizaId(tarefas.uid) }}>
                                    <Icon name='trash' size={25} color='red'/>
                                    <Text style={ { marginTop: 5, marginLeft: 2}}>Excluir</Text>
                                </TouchableOpacity>
                            </View>    
                    </View>
                </View>
             )
    */ 
    
    renderRow(tarefas){
        if(tarefas.tarefaPrioritaria == 'Sim'){
            return (
                <View  style={{ marginTop: 2}}>
                    <Text style={styles.tarefaPri}>Atenção!!! Esta é uma tarefa prioritária.</Text>
                    <View style={styles.container2}>
                            <View style={styles.mantem}>
                                    <Text style={styles.desc}>{tarefas.descricao}</Text>
                                    <Text style={styles.obs}>{this.obsTarefa(tarefas.observacoes)}</Text>
                                    <Text style={styles.inicio}>Iniciada em: {moment(tarefas.dataInicioTarefa).locale('pt-br').format('ddd, D [de] MMMM HH:mm')}</Text>
                            </View>  
                            <View style={ { marginRight: 10}}>
                                <TouchableOpacity  style={styles.manter} onPress={() => this._concluitarefa(tarefas.uid, 
                                                                                                        tarefas.descricao, 
                                                                                                        tarefas.observacoes, 
                                                                                                        tarefas.nomeUsuario,
                                                                                                        tarefas.dataInicioTarefa,
                                                                                                        tarefas.tarefaPrioritaria,
                                                                                                        tarefas.grauDaTarefa,
                                                                                                        tarefas.dataReinicioTarefa,
                                                                                                        tarefas.qtdDias,
                                                                                                        tarefas.qtdMinutos,
                                                                                                        tarefas.qtdSegundos,
                                                                                                        tarefas.tarefaReiniciada,
                                                                                                        tarefas.qtdHoras
                                                                                                        )}>
                                    <Icon name='check-circle' size={25} color='green'/>
                                    <Text style={ { marginTop: 3, marginLeft: 2}}>Concluir</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  style={styles.manter2}  onPress={() => { this.setState({ showExcTask: true }), this.atualizaId(tarefas.uid) }}>
                                    <Icon name='trash' size={25} color='red'/>
                                    <Text style={ { marginTop: 5, marginLeft: 2}}>Excluir</Text>
                                </TouchableOpacity>
                            </View>    
                    </View>
                </View>
             )
        }else{
            return(
                <View>

                </View>
            )
        }
       
    }
    

    render() {
        //const options = { email: this.props.email}
      
        return (
            <View style = {styles.container}>
              <AddTarefasEmAndamento isVisible={this.state.showAddTask}
                   onSave={this.fechamodal} 
                   onCancel={() => this.setState({showAddTask: false})} />
             <ModalExcluirTarefaEmAndamento isVisible={this.state.showExcTask}
                   onSave={this.fechamodal} 
                   onCancel={() => this.setState({showExcTask: false})} />
               <View style = {styles.background}>
                    <View style = {styles.botaoMenu}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='bars' size={25} color='white'/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Tarefas em andamento.</Text>
                        <Text style={styles.subtitle}>

                            {moment().locale('pt-br').format('ddd, D [de] MMMM HH:mm')}
                        </Text>
                                  
                    </View>
                </View>
                <View style={styles.taskContainer}>
                    <ListView 
                    enableEmptySections={true}
                        dataSource = {this.fonteDeDados}
                        renderRow = {data => this.renderRow(data)}
                    />
                </View>
                <ActionButton buttonColor={'#084d6e'}
                    onPress={() => { this.setState({ showAddTask: true }) }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    background: {
        flex: 2.5,  
        //width: '100%',
        backgroundColor: '#084d6e'
    },
    tarefaPri: {
        textAlign: 'center',
        fontSize: 14,
        color: '#FF6347',
        marginTop: 5
    },
    container2: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA',
        justifyContent: 'space-between',
       
    },
    manter2: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    mantem: {
        width: '75%',
    },
    title: {
        color: "#FFF",
        fontSize: 27,
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 40
    },
    subtitle: {
        color: "#FFF",
        fontSize: 20,
        marginLeft: 22,
        marginBottom: 30
    }, 
    taskContainer: {
        flex: 5,
        
    },
    botaoMenu: {
        marginLeft: 20,
        marginTop: 10

    },
    desc: {
        color: '#555',
        fontSize: 20,
        marginLeft: 10
    },
    obs: {
        color: '#555',
        fontSize: 16,
        marginLeft: 10
    },
    inicio: {
        color: '#555',
        fontSize: 15,
        marginLeft: 10,
        marginBottom: 5
    },
    button: {
        backgroundColor: '#080',
        marginTop: 5,
        padding: 5,
        color: '#fff',
     
        
    },
    btnExcluir: {
        backgroundColor: '#ff4040',
        marginTop: 5,
        padding: 5,
        color: '#fff',
    },
    manter: {
        flexDirection: 'row'
    },

})


const mapStateToProps = state => {
    const tarefas = _.map(state.ListaTarefasEmAndamentoReducer, (val, uid) => {
        return { ...val, uid }
    })
  
    return{
        idTarefa: state.tarefasReducer.uid,
        tarefas: tarefas

    }

}  

export default connect(mapStateToProps, {tarefasUsuarioFetchEmAndamento,ExcluirTarefaEmAndamento, concluiTarefa,modificaUID,concluiTarefaReiniciada})(EmAndamentoPrioritario)

//export default Inicios