import firebase from 'firebase'
import { setMessage } from './message'
import b64 from 'base-64'
import _ from 'lodash';
import { }  from './types' 
import moment from 'moment';



export const ExcluirTarefaEmAndamento = ({ IdTarefa }) => {
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;
    return dispatch => {
        const idTarefa  = IdTarefa;

        const EmailB64 = b64.encode(usuarioEmail);
                 firebase.database().ref(`/tarefasemandamento/${EmailB64}/${idTarefa}`).remove()
                    .then(res => {
                        dispatch(setMessage({
                            title: ':)',
                            text: 'Tarefa excluida com sucesso.'
                        }))
                    })
                    .catch(erro => {
                        dispatch(setMessage({
                            title: ':(',
                            text: 'Não foi possivel excluir a tarefa.'
                            }))
                    })
    }
}


export const concluiTarefa = ({IdTarefa,descTarefa, obsTarefa, userTarefa, dataTarefa, tarefaPr, grauTar }) => {
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;
    const terminoTarefa = moment().locale('pt-br').format();
    var today  = moment(terminoTarefa)
    var day = moment(dataTarefa);
    var duracao = moment.duration(today.diff(day));
    var minutos = duracao.asMinutes();
    var horas = duracao.asHours();
    var dias = duracao.asDays();
    var segundos = duracao.asSeconds();
    //horas = horas.toPrecision(1);
    const idTarefa  = IdTarefa;
    const EmailB64 = b64.encode(usuarioEmail);
   
    tarefaReiniciada = 'Nao'
    dia = Math.trunc(dias);
    
    dias = dia;

    hora = Math.trunc(horas);

    horas = hora;

    if(horas > 24){
        horas = horas%24;
    }
  
    if(minutos > 60){
        minutos = minutos%60;
    }
    minutos = minutos.toFixed(0);

    if(segundos > 60){
        segundos = segundos%60;
    }
    
    return dispatch => {
    
        firebase.database().ref(`/tarefasconcluidas/${EmailB64}`)
        .push({ nomeUsuario: userTarefa, 
                descricao: descTarefa, observacoes: obsTarefa, 
                tarefaPrioritaria: tarefaPr, grauDaTarefa: grauTar,
                dataInicioTarefa: dataTarefa, dataTerminoTarefa: terminoTarefa, tarefaReiniciada: tarefaReiniciada,
                qtdMinutos: minutos, qtdHoras: horas, qtdDias: dias, qtdSegundos: segundos
            })
        .then(res =>  {
            firebase.database().ref(`/tarefasemandamento/${EmailB64}/${idTarefa}`).remove()
                .then( res => {
                    dispatch(setMessage({
                        title: 'Parabéns',
                        text: 'Tarefa concluida com sucesso!!.'
                        }))
                })
                .catch( err => console.log(err))
        })
        .catch(erro => {
            dispatch(setMessage({
                title: ':(',
                text: 'Não foi possivel concluir a tarefa.'
             }))
        })         
    }
} 