import React, { Component } from 'react'
import {StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux';
import commonStyles from '../commonStyles';
import AuthInput from  '../components/AuthInput';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../store/actions/AutenticacaoActions';


class Login extends Component {
    
    
    componentDidUpdate = prevProps => {
        if(prevProps.isLoading && !this.props.isLoading){
            this.props.navigation.navigate('EmAndamento')
        } 
    }
    _autenticarUsuario(){
        const email = this.props.email;
        const senha = this.props.senha;
        this.props.autenticarUsuario({ email, senha });  
    
    }

    renderBtnAcessar(validForm) {
        if(this.props.loading_login){
            return (
                <ActivityIndicator size="large" style={styles.rolar}/>
            )
        }

        return (
            <TouchableOpacity disabled={!validForm}
                onPress={() => this._autenticarUsuario()}>
                <View style={[styles.button, !validForm ? {backgroundColor: '#AAA'}: {}]}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </View>
            </TouchableOpacity>
         )
    }

    render() {
        
        const validations = []

        validations.push(this.props.email && this.props.email.includes('@'))
        validations.push(this.props.senha && this.props.senha.length >= 6)
        const validForm = validations.reduce((all, v) => all && v)
       
    

        return(
          
          <View style={styles.container}>
           
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Tarefas</Text>  
                    <Text style={styles.subtitle}> Informe seus dados </Text> 
                    <AuthInput icon='at' placeholder='E-mail' style={styles.input}
                            keyboardType='email-address' value={this.props.email}
                            onChangeText={texto => this.props.modificaEmail(texto) }
                    />
                    <AuthInput icon='lock' secureTextEntry={true} placeholder='Senha' style={styles.input}
                            value={this.props.senha}
                            onChangeText={texto => this.props.modificaSenha(texto) }
                    />   
                   {this.renderBtnAcessar(validForm)}
                 </View>
                 <TouchableOpacity style ={{ padding: 10 }}
                    onPress={() => {
                        this.props.navigation.navigate('Cadastro')
                    }}>
                    <Text style={styles.buttonText}>
                        Ainda não possui conta?
                    </Text>
                </TouchableOpacity>
         </View>
      
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#084d6e'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 70,
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    },
      formContainer: {
       //backgroundColor: '#778899',
       padding: 20,
       width: '90%'
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF'
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        //fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    },
    rolar: {
        marginTop: 20
    }
})

const mapStateToProps = state => (
    {
        email: state.autenticacaoReducer.email,
        senha: state.autenticacaoReducer.password,
        isLoading: state.autenticacaoReducer.isLoading,
        loading_login: state.autenticacaoReducer.loading_login
    }
)


//export default Login

export default connect(mapStateToProps, { modificaEmail,modificaSenha, autenticarUsuario })(Login)


