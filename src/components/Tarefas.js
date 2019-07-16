import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';

export default props => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.desc}>{props.desc}</Text>
                <Text style={styles.obs}>{props.obs}</Text>
                <Text style={styles.data}>Iniciada em: {moment(props.dataInicio).locale('pt-br').format('ddd, D [de] MMMM [às] HH:mm')}</Text>
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA'
    },
    desc: {
        color: '#555',
        fontSize: 18,
        marginLeft: 10
    },
    obs: {
        color: '#555',
        fontSize: 16,
        marginLeft: 10
    },
    data: {
        color: '#555',
        fontSize: 14,
        marginLeft: 10
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',

    },
    pending: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555'
    },
   


})