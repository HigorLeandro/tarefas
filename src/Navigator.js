import React from 'react'
import { 
    createBottomTabNavigator,
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator
} from 'react-navigation';

import Login from './telas/Login';
import Cadastro from './telas/Cadastro';
import EmAndamento from './telas/EmAndamento';
import Contato from './telas/Contato';
import Sobre from './telas/Sobre';
import Afazer from './telas/Afazer';
import Menu from './telas/Menu'
import AddTarefasAFazer from './telas/AddTarefasAFazer'
import TesteAddTarefa from './telas/TesteAddTarefa'
import Teste from './telas/Teste'
import TarefasConcluidas from './telas/TarefasConcluidas'
import AuthorApp from './telas/AuthorApp'
import Inicio from './telas/Inicio'
import EmAndamentoPrioritario from './telas/EmAndamentoPrioritario'
import EmAndamentoSemPrioridade from './telas/EmAndamentoSemPrioridade'


const MenuRoutes = {
    Inicio: {
        name: 'Início',
        screen: Inicio,
        navigationOptions: {
            title: 'Início'
     
            
        }
    },
    EmAndamento: {
        screen: EmAndamento,
        navigationOptions: {
            title: 'Em andamento'   
        }
    },
    Afazer: {
        screen: Afazer,
        navigationOptions: {
            title: 'A fazer'   
        }
    },
    EmAndamentoPrioritario: {
        screen: EmAndamentoPrioritario,
        navigationOptions: {
            title: 'Em Andamento (Prioritárias)'   
        }
    },
    EmAndamentoSemPrioridade: {
        screen: EmAndamentoSemPrioridade,
        navigationOptions: {
            title: 'Em Andamento (Sem Prioridade)'   
        }
    },
    TarefasConcluidas: {
        screen: TarefasConcluidas,
        navigationOptions: {
            title: 'Concluidas'   
        }
    },
    Contato: {
        screen: Contato,
        navigationOptions: {
            title: 'Contato'   
        }
    },
    Sobre: {
        screen: Sobre,
        navigationOptions: {
            title: 'Sobre' ,    
        }
    },
  
}

const MenuConfig = {
    initialRouteName: 'Inicio',
    contentComponent: Menu,
}

const MenuNavigator = createDrawerNavigator(MenuRoutes, MenuConfig)

const MainRoutes = {
    Login: {
        name: 'Login',
        screen: Login,
        navigationOptions: {
            //title: 'Feed'
     
            
        }
        
    },
    PrioritariaOuNormal: {
        name: 'Inicio',
        screen: MenuNavigator,
        navigationOptions: {
            //title: 'Feed'
     
            
        }
        
    },
    AuthorApp: {
        name: 'AuthorApp',
        screen: AuthorApp,
        navigationOptions: {
            //title: 'Feed'
     
            
        }
        
    },
    Cadastro: {
        name: 'Cadastro',
        screen: Cadastro,
        navigationOptions: {
           //title: 'Cadastro'
         
        }
    },
    Teste: {
        name: 'Teste',
        screen: Teste,
        navigationOptions: {
           //title: 'Cadastro'
         
        }
    },
    EmAndamento: {
        name: 'Afazer',
        screen: MenuNavigator,
        navigationOptions: {
           //title: 'Cadastro'
         
        }
    }

}






const MainNavigator  = createSwitchNavigator(MainRoutes, {
    initialRouteName: 'AuthorApp'
    
})


export default MainNavigator