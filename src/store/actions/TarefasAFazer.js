import firebase from 'firebase'
import { setMessage } from './message'
import b64 from 'base-64'
import _ from 'lodash';
import { }  from './types' 
import moment from 'moment';



export const MudaStatusAFazerAndamento = ({IdTarefa,descTarefa, obsTarefa, userTarefa, dataTarefa, tarefaPr, grauTar }) => {
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;

    const DiaInicioTarefa = moment().locale('pt-br').format('D');
    const HoraInicioTarefa =  moment().locale('pt-br').format('HH:mm');
    const MesInicioTarefa = moment().locale('pt-br').format('MMMM');
    const momemntInicial = moment().locale('pt-br').format();
    const tarefaReiniciada = 'Nao';
    return dispatch => {
        var today  = moment("Tue May 19 2016 09:10:00 GMT-0300 (BRT)");
        var day = moment("Thu May 19 2016 05:00:00 GMT-0300 (BRT)");
        var duracao = moment.duration(today.diff(day));
        var horas = duracao.asMinutes();
        const idTarefa  = IdTarefa;
        const EmailB64 = b64.encode(usuarioEmail);
        firebase.database().ref(`/tarefasemandamento/${EmailB64}`)
                    .push({ InicioTarefa: dataTarefa, nomeUsuario: userTarefa, 
                            descricao: descTarefa, observacoes: obsTarefa, 
                            tarefaPrioritaria: tarefaPr, grauDaTarefa: grauTar, tarefaReiniciada: tarefaReiniciada,
                            HoraInicioTarefa: HoraInicioTarefa, MesInicioTarefa:MesInicioTarefa, 
                            DiaInicioTarefa:DiaInicioTarefa, dataInicioTarefa: momemntInicial})
                    .then(res =>  {
                        dispatch(setMessage({
                            title: ':)',
                            text: 'Tarefa Iniciada com sucesso.'
                         }))
                        firebase.database().ref(`/tarefasafazer/${EmailB64}/${idTarefa}`).remove()
                            .then( res => console.log(res))
                            .catch( err => console.log(err))
                    })
                    .catch(erro => {
                        dispatch(setMessage({
                            title: ':(',
                            text: 'Não foi possivel iniciar a tarefa.'
                    }))
            })
  
            
    }
} 


export const ExcluirTarefaAFazer = ({ IdTarefa }) => {
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;
    return dispatch => {
        const idTarefa  = IdTarefa;

        const EmailB64 = b64.encode(usuarioEmail);
                 firebase.database().ref(`/tarefasafazer/${EmailB64}/${idTarefa}`).remove()
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