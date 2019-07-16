import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet, AsyncStorage} from 'react-native'
import { connect } from 'react-redux'

import { modificaEmail, autenticarUsuario, modificaNome
} from '../store/actions/AutenticacaoActions';


class AuthorApp extends Component {
   
  /*  componentDidUpdate = prevProps => {
        if(prevProps.isLoading && !this.props.isLoading){
            this.props.navigation.navigate('EmAndamento')
        } 
    }*/
  


    componentWillMount = async () => {
         const token = await AsyncStorage.getItem('token')
         const name = await AsyncStorage.getItem('name')
         const email = await AsyncStorage.getItem('email')
         this.props.email = this.props.modificaEmail(email)  
         this.props.name = this.props.modificaNome(name)  
         const senha = '123456'
         if(token){
            //const email = 'higor@gmail.com'
            //const senha = '123456'
            //this.props.autenticarUsuario({ email, senha });
            
            this.props.navigation.navigate('PrioritariaOuNormal')
         }else{
        
            this.props.navigation.navigate('Login')
         }
    }



    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large'/>
            </View>
        )
    }
}

var styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})


const mapStateToProps = state => (
    {
        name: state.autenticacaoReducer.name,
        email: state.autenticacaoReducer.email,
        isLoading: state.autenticacaoReducer.isLoading,
    }
)


//export default Login

export default connect(mapStateToProps,{modificaEmail,autenticarUsuario, modificaNome})(AuthorApp)

