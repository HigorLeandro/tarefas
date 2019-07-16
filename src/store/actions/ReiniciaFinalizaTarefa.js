import firebase from 'firebase'
import { setMessage } from './message'
import b64 from 'base-64'
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/pt-br';


export const reiniciarTarefa = ({uid, descricao, observacoes, nomeUsuario, momemntInicial, tarefaPrioritaria, grauDaTarefa,qtdDias, qtdHoras, qtdMinutos,qtdSegundos,dataInicioTarefa,dataTerminoTarefa,InicioTarefa}) => {
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;
    const dataReinicioTask = moment().locale('pt-br').format();
    const tarefaReiniciada = 'Sim'
  
    return dispatch => {
        const EmailB64 = b64.encode(usuarioEmail);
        firebase.database().ref(`/tarefasemandamento/${EmailB64}`)
        .push({ descricao: descricao,  observacoes: observacoes,  nomeUsuario:nomeUsuario,
                tarefaPrioritaria: tarefaPrioritaria, grauDaTarefa: grauDaTarefa,
                qtdDias: qtdDias, qtdHoras: qtdHoras, qtdMinutos: qtdMinutos, qtdSegundos:qtdSegundos,
                dataInicioTarefa: dataInicioTarefa, dataReinicioTarefa: dataReinicioTask, tarefaReiniciada:tarefaReiniciada
            })
        .then(res =>  {
            firebase.database().ref(`/tarefasconcluidas/${EmailB64}/${uid}`).remove()
                .then( res => {
                    dispatch(setMessage({
                        title: ':)',
                        text: 'Tarefa reiniciada com sucesso!!.'
                        }))
                })
                .catch( err => console.log(err))
        })
        .catch(erro => {
            dispatch(setMessage({
                title: ':(',
                text: 'Não foi possivel reiniciar a tarefa.'
             }))
        })         
    }
} 


export const concluiTarefaReiniciada = ({IdTarefa, descTarefa, obsTarefa, userTarefa, dataTarefa, tarefaPr, 
    grauTar,dataReinicioTarefa,qtdDias,qtdMinutos,qtdSegundos, tarefaReiniciada, qtdHoras}) => {


   
    return dispatch => {
      
    }
}