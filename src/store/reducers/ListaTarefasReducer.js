import {
    LISTA_TAREFAS_AFAZER
} from '../actions/types';


const INITIALSTATE = {}

export default (state = INITIALSTATE, action) => {

    switch(action.type){
    case LISTA_TAREFAS_AFAZER: {
            return action.payload
    }
        default:
            return state;
    }
   
}