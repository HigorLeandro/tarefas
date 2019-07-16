import firebase from 'firebase'
import { setMessage } from './message'
import b64 from 'base-64'
import _ from 'lodash';
import { LISTA_TAREFAS_EMANDAMENTO }  from './types' 


export const tarefasUsuarioFetchEmAndamento = () => {
    const { currentUser } = firebase.auth();
    const usuarioEmail = currentUser.email;

    return (dispatch) => {
        const EmailB64 = b64.encode(usuarioEmail);

        firebase.database().ref(`/tarefasemandamento/${EmailB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_TAREFAS_EMANDAMENTO, payload: snapshot.val()})
            })

    }
}