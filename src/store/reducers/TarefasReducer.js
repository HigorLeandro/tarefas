import { 
    MODIFICA_DESCRICAO,
    MODIFICA_OBSERVACAO,
    MODIFICA_ADDTASK,
    TAREFASUCESSOAFAZER,
    LISTA_TAREFAS_AFAZER,
    TAREFASUCESSOAFAZERR,
    MODIFICA_PRIORIDADE,
    MODIFICA_UID,
    SUCESSOEXCLUIRTAREFA
} from '../actions/types';



const initialState = {
    desc: '',
    obs: '',
    prioritaria: 'Não',
    showAddTask: false,
    showExcTask: false,
    uid: ''
}


export default (state = initialState, action) => {
    switch(action.type){
        case MODIFICA_DESCRICAO:
            return { ...state, desc: action.payload}
        case MODIFICA_OBSERVACAO:
            return { ...state, obs: action.payload}
        case MODIFICA_PRIORIDADE:
            return { ...state, prioritaria: action.payload}
        case MODIFICA_UID:
            return { ...state, uid: action.payload}
        case SUCESSOEXCLUIRTAREFA:
            return { ...state, uid: ''}
        case TAREFASUCESSOAFAZER:
            return { ...state, desc: '', obs: '', prioritaria: 'Não'}
        case TAREFASUCESSOAFAZERR: {
            return { ...state, desc: 'X', obs: 's'}
    }
            
        default:
            return state;
    }
   
}