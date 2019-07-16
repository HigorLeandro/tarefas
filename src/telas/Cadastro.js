import React, { Component } from 'react'
import {StyleSheet, Text, TextInput, View, ScrollView,Button, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import commonStyles from '../commonStyles'
import AuthInput from  '../components/AuthInput'
import { modificaEmail, 
         modificaSenha, 
         modificaNome,
         confirmaSenha,
         cadastraUsuario 
} from '../store/actions/AutenticacaoActions';

class Cadastro extends Component {
   

    componentDidUpdate = prevProps => {
        if(prevProps.isLoading && !this.props.isLoading){
            this.props.navigation.navigate('Login')
        } 
    }

    _cadastraUsuario(){
        const nome = this.props.nome;
        const email = this.props.email;
        const senha = this.props.senha;
        this.props.cadastraUsuario({ nome, email, senha });  
    
    }

    renderBtnAcessar(validForm) {
        if(this.props.loading_login){
            return (
                <ActivityIndicator size="large" style={styles.rolar}/>
            )
        }

        return (
            <TouchableOpacity disabled={!validForm}
                onPress={ () => this._cadastraUsuario()}>
                <View style={[styles.button, !validForm ? {backgroundColor: '#AAA'}: {}]}>
                    <Text style={styles.buttonText}>Registrar</Text>
                </View>
            </TouchableOpacity>
         )
    }
    
    render() {

        const validations = []

        validations.push(this.props.email && this.props.email.includes('@'))
        validations.push(this.props.senha && this.props.confirmPassword.length >= 6)
        validations.push(this.props.nome && this.props.nome.trim())
        validations.push(this.props.senha === this.props.confirmPassword)

        const validForm = validations.reduce((all, v) => all && v)

        return(
               
            
            <View style={styles.container}>
                <View>            
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.formContainer}> 
                    <Text style={styles.title}>Tarefas</Text>  
                    <Text style={styles.subtitle}> Crie a sua conta </Text>
                    <AuthInput icon='user' placeholder='Nome' style={styles.input}
                                                value={this.props.nome}
                                                onChangeText={texto => this.props.modificaNome(texto) }
                    />
                    <AuthInput icon='at' placeholder='E-mail' style={styles.input}
                            value={this.props.email} keyboardType='email-address'
                            onChangeText={texto => this.props.modificaEmail(texto) }
                    />
                    <AuthInput icon='lock' secureTextEntry={true} placeholder='Senha' style={styles.input}
                            onChangeText={texto => this.props.modificaSenha(texto) }
                    />   
                    <AuthInput icon='asterisk' secureTextEntry={true}  placeholder='Confirmação' 
                            style={styles.input}  
                            onChangeText={texto => this.props.confirmaSenha(texto) }
                    />
                    {this.renderBtnAcessar(validForm)}
                 </View>
                 <TouchableOpacity style ={{ padding: 10 }}
                    onPress={()  => {
                        this.props.navigation.navigate('Login')
                    }}>
                    <Text style={styles.buttonText}>
                        Já possui conta?
                    </Text>
                </TouchableOpacity>
                </ScrollView>
                </View>

         </View>
      
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //width: '100%',
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
     
       padding: 15,
       //width: '90%',
       
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
        fontSize: 20,
        textAlign: 'center'
    },
    rolar: { 
        marginTop: 20
    }
})


const mapStateToProps = state => {
  
    return (
        {
            nome: state.autenticacaoReducer.name,
            email: state.autenticacaoReducer.email,
            senha: state.autenticacaoReducer.password,
            confirmPassword: state.autenticacaoReducer.confirmPassword,
            isLoading: state.autenticacaoReducer.isLoading,
            loading_login: state.autenticacaoReducer.loading_login
        }
    )
}

export default connect(mapStateToProps, { 
                                            modificaEmail, 
                                            modificaSenha, 
                                            modificaNome,  
                                            confirmaSenha,
                                            cadastraUsuario 
                                        })(Cadastro)