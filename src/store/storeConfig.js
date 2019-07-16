import { createStore, combineReducers, applyMiddleware } from 'redux'

import usuarioReducer from './reducers/usuarioreducer'
import autenticacaoReducer from './reducers/AutenticacaoReducer'
import mensagemReducer from './reducers/message'
import tarefasReducer from './reducers/TarefasReducer'
import ReduxThunk from 'redux-thunk';
import ListaTarefasReducer from './reducers/ListaTarefasReducer';
import ListaTarefasEmAndamentoReducer from './reducers/ListaTarefasEmAndamentoReducer'
import ListaTarefasConcluidasReducer from './reducers/ListaTarefasConcluidasReducer'

const reducers = combineReducers({
    usuario: usuarioReducer,
    autenticacaoReducer: autenticacaoReducer,
    message: mensagemReducer,
    tarefasReducer: tarefasReducer,
    ListaTarefasReducer: ListaTarefasReducer,
    ListaTarefasEmAndamentoReducer: ListaTarefasEmAndamentoReducer,
    ListaTarefasConcluidasReducer: ListaTarefasConcluidasReducer
    
    
})


const storeConfig = () => {
    return createStore(reducers, {}, applyMiddleware(ReduxThunk))
}


export default storeConfig

 