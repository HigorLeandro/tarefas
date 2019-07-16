import { MODIFICA_EMAIL, 
    MODIFICA_SENHA,
    MODIFICA_NOME,
    CONFIRMA_SENHA,
    LOANDING_USUARIO,
    USUARIO_LOGADO,
    LOGIN_EM_ANDAMENTO,
    ERROUSER
} from '../actions/types';



const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isLoading: false,
    loading_login: false
}

export default (state = initialState, action) => {
 
    switch(action.type){
        case MODIFICA_EMAIL:
            return { ...state, email: action.payload}
        case MODIFICA_SENHA:
            return { ...state, password: action.payload}
        case MODIFICA_NOME: 
            return { ...state, name: action.payload}
        case CONFIRMA_SENHA:
            return { ...state, confirmPassword: action.payload}
        case  'cadastro_usuario_erro':
             return { ...state, erroCadastro: action.payload}
        case LOANDING_USUARIO:
            return { ...state, isLoading: true}
        case USUARIO_LOGADO:
             return { ...state, isLoading: false, loading_login: false}
        case LOGIN_EM_ANDAMENTO:
            return { ...state, loading_login: true}
        case ERROUSER:
            return { ...state, loading_login: false}
        default:
            return state;
    }
   
}



