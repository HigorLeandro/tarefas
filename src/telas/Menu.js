    
import React from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import { DrawerItems } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux';
import firebase from 'firebase'


const Menu = props => {

    sair = () => {
        firebase.auth().signOut()
            .then(() => props.navigation.navigate('Login'))
        AsyncStorage.removeItem('email')
        AsyncStorage.removeItem('name')
        AsyncStorage.removeItem('token')
    }
    return (
        <ScrollView>
            <View style = {styles.header}>
                <Text style= {styles.title}>Tarefas</Text>
                <View style={styles.userInfo}>
                    <Text style={styles.name}> {props.name} </Text>
                    <Text style={styles.email}> {props.email} </Text>
                </View>
            </View>
            
            <DrawerItems { ...props } />
            <TouchableOpacity onPress={sair}>
                      <View style={styles.logoutIcon}>
                            <Text style={styles.sair}>Sair</Text>
                            <Icon name="sign-out" size={20}
                                color='#084d6e' style={styles.icon} />
                        </View>
                </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD',
    },
    title: {
        backgroundColor: '#FFF',
        color: '#000',
        fontFamily: 'black',
        fontSize: 30,
        paddingTop: 30,
        padding: 10,
    },
    name: {
        fontSize: 20,
        marginLeft: 10,
    },
    email: {
        fontSize: 15,
        marginLeft: 10,
        marginBottom: 10,
    },
    menu: {
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    userInfo: {
        //flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logoutIcon: {
        marginRight: 20,
        flexDirection: 'row',
    },
    sair: {
        backgroundColor: '#FFF',
        color: '#000',
        fontSize: 14,
        marginLeft: 15,
        fontWeight: "bold"
      
    },
    icon: {
        marginLeft: 5
    }
})

const mapStateToProps = state => (
    {
        name: state.autenticacaoReducer.name,
        email: state.autenticacaoReducer.email,
    }
)


//export default Login

export default connect(mapStateToProps)(Menu)

