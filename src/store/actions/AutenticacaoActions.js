import firebase from 'firebase'
import { setMessage } from './message'
import b64 from 'base-64'
import _ from 'lodash';
import { MODIFICA_EMAIL, 
        MODIFICA_SENHA,
         MODIFICA_NOME,
         CONFIRMA_SENHA,
         LOANDING_USUARIO,
         USUARIO_LOGADO,
         LOGIN_EM_ANDAMENTO,
         ERROUSER,
         TAREFASUCESSOAFAZERR
} from './types'
import { AsyncStorage } from 'react-native'

export const modificaEmail = (texto) => {
   
    return{
        type: MODIFICA_EMAIL,
        payload:  texto
    }
}

export const modificaSenha = (texto) => {
    return{
        type:  MODIFICA_SENHA,
        payload:  texto
    }
}

export const modificaNome = (texto) => {
   
    return{
        type: MODIFICA_NOME,
        payload:  texto
    }
}

export const confirmaSenha = (texto) => {
  
    return{
        type: CONFIRMA_SENHA,
        payload:  texto
    }
}

export const cadastraUsuario = ({ nome, email, senha }) => {
    return dispatch => {
        dispatch(loadingUsuario())
        dispatch({ type: LOGIN_EM_ANDAMENTO });
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                let emailB64 = b64.encode(email);

                firebase.database().ref(`/usuarios/${emailB64}`)
                    .push({ nome })
                    .then(value => {
                        dispatch(setMessage({
                            title: 'Quase lá',
                            text: 'Cadastro realizado com sucesso. Faça o login para continuar.'
                        }))
                        dispatch(usuarioLogado())
                    })

              
            })
            .catch(erro => {
                dispatch(setMessage({
                    title: ':(',
                    text: 'Erro ao tentar realizar cadastro! Verifique seus dados e tente novamente.'
                }))
                dispatch({ type: ERROUSER })
            })
    }
}
 
const cadastroUsuarioSucesso = (dispatch) => {
    dispatch (
        {
            type: 'cadastra_usuario_sucesso'
                   
        }
    );

}

const cadastroUsuarioErro = (erro, dispatch) => {
    dispatch (
        {
            type: 'cadastro_usuario_erro',
            payload: erro.message  
        }
    );
}


export const usuarioLogado = () => {
        return  {
            type: USUARIO_LOGADO,
        }
} 



export const loadingUsuario = () => {
    return  {
        type:  LOANDING_USUARIO,
    }
} 

export const autenticarUsuario = ({ email, senha }) => {
    return dispatch => {
        dispatch({ type: LOGIN_EM_ANDAMENTO });
        dispatch(loadingUsuario())
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => {
                const dados = _.first(_.values(value));
                const token = dados.uid;
                
                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('email', email);
               
               
                var emailB64 = b64.encode(email);
                firebase.database().ref(`/usuarios/${emailB64}`).once('value', data =>{
                    if(data.val()){
                        const dadosUsuario = _.first(_.values(data.val()));
                        AsyncStorage.setItem('name', dadosUsuario.nome);
                        dispatch(modificaNome(dadosUsuario.nome)) 
                    }
                })
                dispatch({ type: ERROUSER })
                dispatch(usuarioLogado())
                       
            })
            .catch(erro => {
                dispatch(setMessage({
                    title: ':(',
                    text: 'O endereço de email ou a senha que você inseriu não é válido.'
                }))
               dispatch({ type: ERROUSER })
               
            });
    }

}

const LOGINUSUARIOSUCESSO = (dispatch) => {
    dispatch (
        {
            type: 'login_usuario_sucesso'
        }
    );
}

const loginUsuarioErro = (erro, dispatch) => {
    dispatch ( 
        {
            type: 'login_usuario_erro'
        }
    );
}

