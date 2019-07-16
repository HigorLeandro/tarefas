import firebase from 'firebase'
import { setMessage } from './message'
import b64 from 'base-64'
import _ from 'lodash';
import { }  from './types' 
import moment from 'moment';

export const ExcluirTarefaConcluida = ({ IdTarefa }) => {
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;
    return dispatch => {
        const idTarefa  = IdTarefa;

        const EmailB64 = b64.encode(usuarioEmail);
                 firebase.database().ref(`/tarefasconcluidas/${EmailB64}/${idTarefa}`).remove()
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