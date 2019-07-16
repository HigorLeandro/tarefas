import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ListView, TouchableHighlight, Modal,TouchableWithoutFeedback} from 'react-native'
import moment from 'moment';
import 'moment/locale/pt-br';
import ActionButton from 'react-native-action-button';
import AddTarefasAFazer from './AddTarefasAFazer'
import ModalExcluirTarefa from './ModalExcluirTarefa'
import Icon from 'react-native-vector-icons/FontAwesome'
import { modifica_addtask, modificaUID } from '../store/actions/Tarefas';
import { tarefasUsuarioFetch } from '../store/actions/ListaTarefasAFazer';
import { MudaStatusAFazerAndamento, ExcluirTarefaAFazer } from '../store/actions/TarefasAFazer';
import _ from 'lodash';






 class Afazer extends Component {

   componentWillMount() {
       this.props.tarefasUsuarioFetch();
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

        showAddTask: false,
        showExcTask: false
    }

    fechamodal = () => {
        this.setState({ showAddTask: false})
        this.setState({ showExcTask: false})
       
    }

    mudastatus (uid, desc, obs, usuario, tarefaPrioritaria,grauDaTarefa) {
        const IdTarefa = uid;
        const descTarefa = desc;
        const obsTarefa = obs;
        const userTarefa = usuario;
        const  tarefaPr = tarefaPrioritaria;
        const grauTar = grauDaTarefa;
        const dataTarefa = moment().locale('pt-br').format('ddd, D [de] MMMM HH:mm')
        //const dataTarefa = new Date().toString();
       
        this.props.MudaStatusAFazerAndamento({IdTarefa, descTarefa, obsTarefa, userTarefa, dataTarefa, tarefaPr, grauTar}); 
       
    }
    
    excluirTarefaAFazer (uid) {
        const IdTarefa = uid;
        this.props.ExcluirTarefaAFazer({IdTarefa}); 
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
   
    atualizaId(id){
        this.props.idTarefa = this.props.modificaUID(id)  
    }

    renderRow(tarefas){

        

        if(tarefas.tarefaPrioritaria == 'Não'){
            return (
                <View style={{ marginTop: 10}}>
                    <View style={styles.container2}>
                            <View style={styles.mantem}>
                                    <Text style={styles.desc}>{tarefas.descricao}</Text>
                                    <Text style={styles.obs}>{this.obsTarefa(tarefas.observacoes)}</Text>
                            </View>  
                            <View style={ { marginRight: 10}}>
                            <View>
                                <TouchableOpacity  style={styles.manter} onPress={() => this.mudastatus(tarefas.uid, 
                                                                                                        tarefas.descricao, 
                                                                                                        tarefas.observacoes, 
                                                                                                        tarefas.nomeUsuario,
                                                                                                        tarefas.tarefaPrioritaria,
                                                                                                        tarefas.grauDaTarefa)}>
                                    <Icon name='play' size={25} color='green'/>
                                    <Text style={ { marginTop: 3, marginLeft: 2}}>Iniciar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  style={styles.manter2} onPress={() => { this.setState({ showExcTask: true }), this.atualizaId(tarefas.uid)}}>
                                    <Icon name='trash' size={25} color='red'/>
                                    <Text style={ { marginTop: 5, marginLeft: 2}}>Excluir</Text>
                                </TouchableOpacity>
                            </View>   
                            </View>    
                    </View>
                </View>
            )
        }else{
            return (
                <View>
                    <Text style={styles.tarefaPri}>Atenção!!! Esta é uma tarefa prioritária.</Text>
                    <View style={styles.container2}>
                            
                            <View style={styles.mantem}>
                                    <Text style={styles.desc}>{tarefas.descricao}</Text>
                                    <Text style={styles.obs}>{this.obsTarefa(tarefas.observacoes)}</Text>
                            </View>  
                            <View style={ { marginRight: 10}}>
                            <View>
                                <TouchableOpacity  style={styles.manter} onPress={() => this.mudastatus(tarefas.uid,
                                                                                                        tarefas.descricao, 
                                                                                                        tarefas.observacoes, 
                                                                                                        tarefas.nomeUsuario,
                                                                                                        tarefas.tarefaPrioritaria,
                                                                                                        tarefas.grauDaTarefa)}>
                                    <Icon name='play' size={25} color='green'/>
                                    <Text style={ { marginTop: 3, marginLeft: 2}}>Iniciar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  style={styles.manter2}  onPress={() => { this.setState({ showExcTask: true }), this.atualizaId(tarefas.uid) }}>
                                    <Icon name='trash' size={25} color='red'/>
                                    <Text style={ { marginTop: 5, marginLeft: 2}}>Excluir</Text>
                                </TouchableOpacity>
                            </View>   
                            </View>    
                    </View>
                </View>
            )
        }

     
    }

    render() {
        return (
            <View style = {styles.container}>
             <AddTarefasAFazer isVisible={this.state.showAddTask}
                   onSave={this.fechamodal} 
                   onCancel={() => this.setState({showAddTask: false})} />
              <ModalExcluirTarefa isVisible={this.state.showExcTask}
                   onSave={this.fechamodal} 
                   onCancel={() => this.setState({showExcTask: false})} />
               <View style = {styles.background}>
                    <View style = {styles.botaoMenu}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='bars' size={25} color='white'/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Tarefas a fazer.</Text>
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
                <ActionButton buttonColor={'#084d6e'}
                       onPress={() => { this.setState({ showAddTask: true }) }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    background: {
        flex: 2.5,  
       // width: '100%',
        backgroundColor: '#084d6e'
    },
    tarefaPri: {
        textAlign: 'center',
        fontSize: 14,
        color: '#FF6347',
        marginTop: 5
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
        marginTop: 10
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
    button: {
        margin: 20,
        marginRight: 30,
        color: '#1631be',
    },
    botaoMenu: {
        marginLeft: 20,
        marginTop: 10

    },
    container: {
        //paddingVertical: 10,
       //flexDirection: 'row',
        flex: 1
    },
    container2: {
        //paddingVertical: 10,
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA',
        justifyContent: 'space-between',
       
    },
    mantem: {
        width: '75%',
    },
    manter: {
        flexDirection: 'row'
    },
    manter2: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
    },
    desc: {
        color: '#555',
        fontSize: 20,
        marginLeft: 10,
      
    },
    obs: {
        color: '#555',
        fontSize: 16,
        marginLeft: 10,
       
    },
    data: {
        color: '#555',
        fontSize: 14,
        marginLeft: 10
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',

    },
    pending: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555'
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
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10,

        



    }
  
})
 


const mapStateToProps = state => {
    
    const tarefas = _.map(state.ListaTarefasReducer, (val, uid) => {
        return { ...val, uid }
        
    })
    return{
        idTarefa: state.tarefasReducer.uid,
        tarefas: tarefas
    }
}





//export default Login

export default connect(mapStateToProps, { tarefasUsuarioFetch, MudaStatusAFazerAndamento, ExcluirTarefaAFazer, modificaUID })(Afazer)