import firebase from 'firebase'
import { setMessage } from './message'
import b64 from 'base-64'
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/pt-br';
import { MODIFICA_DESCRICAO, MODIFICA_OBSERVACAO, MODIFICA_ADDTASK,TAREFASUCESSOAFAZER, LISTA_TAREFAS_AFAZER, MODIFICA_PRIORIDADE, MODIFICA_UID}  from './types' 


export const modificaDesc = (texto) => {
 
    return{
        type: MODIFICA_DESCRICAO,
        payload:  texto
    }
}

export const modificaPrioridade = (texto) => {
 
    return{
        type: MODIFICA_PRIORIDADE,
        payload:  texto
    }
}




export const modificaObs = (texto) => {

    return{
        type:  MODIFICA_OBSERVACAO,
        payload:  texto
    }
}

export const modifica_addtask = () => {
    return{
        type:  MODIFICA_ADDTASK,
    }
}


export const modificaUID = (texto) => {
    return{
        type:  MODIFICA_UID,
        payload:  texto
    }
}



export const salvarTarefas = ({ desc, obs, nome, prioritaria }) => {
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;

   

    return dispatch => {
        if( prioritaria == 'Sim'){
            var pp = 'Prioritária'
        }else{
            var pp = ''
        }
        const EmailB64 = b64.encode(usuarioEmail);
        firebase.database().ref(`/tarefasafazer/${EmailB64}`)
                    .push({ nomeUsuario: nome, descricao: desc, observacoes: obs, tarefaPrioritaria: prioritaria, grauDaTarefa: pp })
                    .then(res =>  {
                                        dispatch({ type: TAREFASUCESSOAFAZER })
                                       
                                  })
                    .catch(erro => {
                        dispatch(setMessage({
                            title: ':(',
                            text: 'O endereço de email ou a senha que você inseriu não é válido.'
                    }))
            })
            
    }
 
}

export const salvarTarefasEmAndamento = ({ desc, obs, nome, prioritaria }) => {
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;
    const EmailB64 = b64.encode(usuarioEmail);
    const DiaInicioTarefa = moment().locale('pt-br').format('D');
    const HoraInicioTarefa =  moment().locale('pt-br').format('HH:mm');
    const MesInicioTarefa = moment().locale('pt-br').format('MMMM');
    const momemntInicial = moment().locale('pt-br').format();
    const dataTarefa = moment().locale('pt-br').format('ddd, D [de] MMMM HH:mm')
    const tarefaReiniciada = 'Nao';
    const dataReinicioTarefa = '';
    const qtdDias = '';
    const qtdMinutos = '';
    const qtdSegundos = '';
    return dispatch => {
        if( prioritaria == 'Sim'){
            var pp = 'Prioritária'
        }else{
            var pp = ''
        }
        const EmailB64 = b64.encode(usuarioEmail);
        firebase.database().ref(`/tarefasemandamento/${EmailB64}`)
                    .push({  InicioTarefa: dataTarefa, nomeUsuario: nome,
                        descricao: desc, observacoes: obs, tarefaReiniciada:tarefaReiniciada,
                        HoraInicioTarefa: HoraInicioTarefa, MesInicioTarefa: MesInicioTarefa, qtdDias:qtdDias, qtdMinutos: qtdMinutos, qtdSegundos:qtdSegundos,
                        DiaInicioTarefa: DiaInicioTarefa, dataInicioTarefa: momemntInicial, dataReinicioTarefa: dataReinicioTarefa,
                        grauDaTarefa: pp,  tarefaPrioritaria: prioritaria })
                    .then(res =>  {
                                     dispatch({ type: TAREFASUCESSOAFAZER })
                                       
                                  })
                    .catch(erro => {
                        dispatch(setMessage({
                            title: ':(',
                            text: 'O endereço de email ou a senha que você inseriu não é válido.'
                    }))
            })
            
    }
 
}





export const tarefasUsuarioFetch = () => {
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;


    return (dispatch) => {
        const EmailB64 = b64.encode(usuarioEmail);

        firebase.database().ref(`/tarefasafazer/${EmailB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_TAREFAS_AFAZER, payload: snapshot.val() })
            })

    }
}