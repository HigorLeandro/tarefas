import { 
    LISTA_TAREFAS_EMANDAMENTO
} from '../actions/types';


const INITIALSTATE = {}

export default (state = INITIALSTATE, action) => {
    switch(action.type){
 
    case LISTA_TAREFAS_EMANDAMENTO: {
        return action.payload
    }
            
        default:
            return state;
    }
   
}