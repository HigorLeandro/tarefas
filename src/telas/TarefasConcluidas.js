import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Alert, Platform, ListView} from 'react-native'
import moment from 'moment';
import 'moment/locale/pt-br';
import Icon from 'react-native-vector-icons/FontAwesome'
import { tarefasUsuarioFetchConcluidas } from '../store/actions/ListaTarefasConcluidas';
import { ExcluirTarefaConcluida } from '../store/actions/TarefasConcluidasAction';
import { reiniciarTarefa } from '../store/actions/ReiniciaFinalizaTarefa'
import _ from 'lodash';
import { modificaUID } from '../store/actions/Tarefas';
import ModalExcluirTarefaConcluida from './ModalExcluirTarefaConcluida';

class TarefasConcluidas extends Component {

    componentWillMount() {
        this.props.tarefasUsuarioFetchConcluidas();
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
         showExcTask: false
     }

     fechamodal = () => {
        this.setState({ showExcTask: false}) 
    }

     _excluirTarefaConcluida (uid) {
        const IdTarefa = uid;
        this.props.ExcluirTarefaConcluida({IdTarefa}); 
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

    tempoGasto(qtdDias, qtdHoras,qtdMinutos, qtdSegundos){
     
        if(qtdDias == '0' && qtdHoras== '0' && qtdMinutos== '0' && qtdSegundos != '0'){
            return(
                <Text style={{ color: '#555', fontSize: 15, marginLeft: 10, marginBottom: 5, marginBottom: 5}}>Tempo gasto: {qtdSegundos} segundos.</Text>
            )
        }else if(qtdDias== '0' && qtdHoras== '0' && qtdMinutos != '0'){
            return(
                <Text style={{ color: '#555', fontSize: 15, marginLeft: 10, marginBottom: 5, marginBottom: 5}}>Tempo gasto: {qtdMinutos} minutos e {qtdSegundos} segundos.</Text>
            )
        }else if(qtdDias== '0' && qtdHoras != '0'){
            return(
                <Text style={{ color: '#555', fontSize: 15, marginLeft: 10, marginBottom: 5, marginBottom: 5}}>Tempo gasto: {qtdHoras} horas, {qtdMinutos} minutos e {qtdSegundos} segundos.</Text>
            )
        }else if(qtdDias !='0'){
            return(
                <Text style={{ color: '#555', fontSize: 15, marginLeft: 10, marginBottom: 5, marginBottom: 5}}>Tempo gasto: {qtdDias} dias, {qtdHoras} horas, {qtdMinutos} minutos e {qtdSegundos} segundos.</Text>
            )  
        } 
        
        
    }

    _reiniciaTarefa (uidtarefa, descricaotarefa, observacoestarefa,nomeUsuariotarefa , momemntInicialtarefa, tarefaPrioritariatarefa,
                    grauDaTarefaAtual,qtdDiastarefa,qtdHorastarefa,qtdMinutostarefa,qtdSegundostarefa, inicioTarefa, terminoTarefa, InicioTarefaRe ) {
        const uid = uidtarefa;
        const descricao = descricaotarefa;
        const observacoes = observacoestarefa;
        const nomeUsuario = nomeUsuariotarefa;
        const momemntInicial = momemntInicialtarefa;
        const  tarefaPrioritaria = tarefaPrioritariatarefa;
        const grauDaTarefa = grauDaTarefaAtual;
        const qtdDias = qtdDiastarefa;
        const qtdHoras = qtdHorastarefa;
        const qtdMinutos = qtdMinutostarefa;
        const  qtdSegundos =qtdSegundostarefa;
        const dataInicioTarefa = inicioTarefa 
        const dataTerminoTarefa = terminoTarefa
        const  InicioTarefa = InicioTarefaRe

        this.props.reiniciarTarefa({uid, descricao, observacoes, nomeUsuario, momemntInicial, tarefaPrioritaria, grauDaTarefa,qtdDias, qtdHoras, qtdMinutos,qtdSegundos,dataInicioTarefa,dataTerminoTarefa, InicioTarefa}); 
       
    }
    
    renderRow(tarefas){
        if(tarefas.tarefaPrioritaria == 'Não'){
            return (
                <View style={{ marginTop: 2}}>
                    <View style={styles.container2}>
                            <View style={styles.mantem}>
                                    <Text style={styles.desc}>{tarefas.descricao}</Text>
                                    <Text style={styles.obs}>{this.obsTarefa(tarefas.observacoes)}</Text>
                                    <Text style={styles.inicio}>Iniciada em: {moment(tarefas.dataInicioTarefa).locale('pt-br').format('ddd, D [de] MMMM HH:mm')} </Text>
                                    <Text style={styles.inicio}>Finalizada em:  {moment(tarefas.dataTerminoTarefa).locale('pt-br').format('ddd, D [de] MMMM HH:mm')}</Text>
                                    {this.tempoGasto(tarefas.qtdDias,tarefas.qtdHoras, tarefas.qtdMinutos, tarefas.qtdSegundos)}
                            </View>  
                            <View style={ { marginRight: 10}}>
                            <TouchableOpacity  style={styles.manter} onPress={() => this._reiniciaTarefa(tarefas.uid, 
                                                                                                            tarefas.descricao, 
                                                                                                            tarefas.observacoes, 
                                                                                                            tarefas.nomeUsuario,
                                                                                                            tarefas.momemntInicial,
                                                                                                            tarefas.tarefaPrioritaria,
                                                                                                            tarefas.grauDaTarefa,
                                                                                                            tarefas.qtdDias,
                                                                                                            tarefas.qtdHoras,
                                                                                                            tarefas.qtdMinutos,
                                                                                                            tarefas.qtdSegundos,
                                                                                                            tarefas.dataInicioTarefa,
                                                                                                            tarefas.dataTerminoTarefa,
                                                                                                            tarefas.InicioTarefa
                                                                                                            )}>
                                        <Icon name='undo' size={25} color='green'/>
                                        <Text style={ { marginTop: 3, marginLeft: 2}}>Reiniciar</Text>
                                    </TouchableOpacity>
                            <TouchableOpacity  style={styles.manter2}  onPress={() => { this.setState({ showExcTask: true }), this.atualizaId(tarefas.uid)}}>
                                        <Icon name='trash' size={25} color='red'/>
                                        <Text style={ { marginTop: 5, marginLeft: 2}}>Excluir</Text>
                                    </TouchableOpacity>
                            </View>    
                    </View>
                </View>
             )
        }else{
            return (
                <View style={{ marginTop: 2}}>
                   <Text style={styles.tarefaPri}>Tarefa prioritária.</Text>
                    <View style={styles.container2}>
                            <View style={styles.mantem}>
                                    <Text style={styles.desc}>{tarefas.descricao}</Text>
                                    <Text style={styles.obs}>{this.obsTarefa(tarefas.observacoes)}</Text>
                                    <Text style={styles.inicio}>Iniciada em: {moment(tarefas.dataInicioTarefa).locale('pt-br').format('ddd, D [de] MMMM HH:mm')} </Text>
                                    <Text style={styles.inicio}>Finalizada em:  {moment(tarefas.dataTerminoTarefa).locale('pt-br').format('ddd, D [de] MMMM HH:mm')}</Text>
                                    {this.tempoGasto(tarefas.qtdDias,tarefas.qtdHoras, tarefas.qtdMinutos, tarefas.qtdSegundos)}
                            </View>  
                            <View style={ { marginRight: 10}}>
                            <TouchableOpacity  style={styles.manter} onPress={() => this._reiniciaTarefa(tarefas.uid, 
                                                                                                            tarefas.descricao, 
                                                                                                            tarefas.observacoes, 
                                                                                                            tarefas.nomeUsuario,
                                                                                                            tarefas.momemntInicial,
                                                                                                            tarefas.tarefaPrioritaria,
                                                                                                            tarefas.grauDaTarefa,
                                                                                                            tarefas.qtdDias,
                                                                                                            tarefas.qtdHoras,
                                                                                                            tarefas.qtdMinutos,
                                                                                                            tarefas.qtdSegundos,
                                                                                                            tarefas.dataInicioTarefa,
                                                                                                            tarefas.dataTerminoTarefa,
                                                                                                            tarefas.InicioTarefa
                                                                                                            )}>
                                        <Icon name='undo' size={25} color='green'/>
                                        <Text style={ { marginTop: 3, marginLeft: 2}}>Reiniciar</Text>
                                    </TouchableOpacity>
                            <TouchableOpacity  style={styles.manter2} onPress={() => { this.setState({ showExcTask: true }), this.atualizaId(tarefas.uid)}}>
                                        <Icon name='trash' size={25} color='red'/>
                                        <Text style={ { marginTop: 5, marginLeft: 2}}>Excluir</Text>
                                    </TouchableOpacity>
                            </View>    
                    </View>
                </View>
             )
        }

    }
    

    render() {
        //const options = { email: this.props.email}
      
        return (
            <View style = {styles.container}>
                <ModalExcluirTarefaConcluida isVisible={this.state.showExcTask}
                   onSave={this.fechamodal} 
                   onCancel={() => this.setState({showExcTask: false})} />
               <View style = {styles.background}>
                    <View style = {styles.botaoMenu}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='bars' size={25} color='white'/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Tarefas Concluidas.</Text>
                        <Text style={styles.subtitle}>

                            {moment().locale('pt-br').format('ddd, D [de] MMMM HH:mm')}
                        </Text>
                                  
                    </View>
                </View>
                <View style={styles.taskContainer}>
                    <ListView 
                        dataSource = {this.fonteDeDados}
                        renderRow = {data => this.renderRow(data)}
                        enableEmptySections={true}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,     
    },
    tarefaPri: {
        textAlign: 'center',
        fontSize: 18,
        color: '#FF6347',
        marginTop: 4
    },
    background: {
        flex: 2.5,  
        //width: '100%',
        backgroundColor: '#084d6e'
    },
    manter: {
        marginTop: 30,
        flexDirection: 'row'
    },
    manter2: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
    },
    container2: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA',
        justifyContent: 'space-between',
       
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        color: "#FFF",
        fontSize: 30,
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
        fontSize: 14,
        marginLeft: 10
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
    mantem: {
        width: '75%',
    },
  
})


const mapStateToProps = state => {
    const tarefas = _.map(state.ListaTarefasConcluidasReducer, (val, uid) => {
        return { ...val, uid }
    })
  
    return{
        idTarefa: state.tarefasReducer.uid,
        tarefas: tarefas.reverse()

    }

}  

export default connect(mapStateToProps, {tarefasUsuarioFetchConcluidas, ExcluirTarefaConcluida, modificaUID, reiniciarTarefa})(TarefasConcluidas)

//export default Inicio