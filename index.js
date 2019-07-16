import React, { Component} from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import firebase from 'firebase'


import storeConfig from './src/store/storeConfig'

const store = storeConfig()

class Redux extends Component {

  

    componentWillMount(){
        var firebaseConfig = {
            apiKey: "AIzaSyAkY8vAJyS16359WRA0AJBAyyzojPkQXDU",
            authDomain: "tarefas-ea31a.firebaseapp.com",
            databaseURL: "https://tarefas-ea31a.firebaseio.com",
            projectId: "tarefas-ea31a",
            storageBucket: "tarefas-ea31a.appspot.com",
            messagingSenderId: "1078037269453",
            appId: "1:1078037269453:web:fe1e83c635444487"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
        
     
    }

  

    render(){
        return(
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}
 

AppRegistry.registerComponent(appName, () => Redux);

export default Redux;