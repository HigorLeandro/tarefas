import { 
    LISTA_TAREFAS_CONCLUIDAS
} from '../actions/types';


const INITIALSTATE = {}

export default (state = INITIALSTATE, action) => {
    switch(action.type){
 
    case LISTA_TAREFAS_CONCLUIDAS: {
        return action.payload
    }
            
        default:
            return state;
    }
   
}