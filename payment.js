import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default TaskItem = (props) => {
    const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const get_i = (d) => {
        return parseInt(d.slice(5,7))-1
    }
    const get_d = (d) => {
        return d.slice(8,10)
    }
    // console.log(props)
    return (
        <View style={styles.container}>
            <View style={styles.taskContainer}>
            <View style={styles.taskMainContainer}>
            <Text style={styles.dateText}>{mon[get_i(props.rec.date)]+'\n'+get_d(props.rec.date)}</Text>
            <MaterialIcons name="movie" size={24} style={styles.icon}/>
            <View style={styles.taskSubContainer}>
                <Text style={styles.task}>{props.rec.description}</Text>
                <Text style={styles.paidBy}>Paid by {props.rec.paid_by}.</Text>
            </View>
            </View>
                <Text style={props.rec.paid_by == 'you' ? styles.amtlent : styles.amtborr}>{props.rec.paid_by == "you" ? '+' : '-'} {props.rec.amount}</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    taskContainer: {
        backgroundColor: '#323242',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingLeft: 5,
        paddingRight: 20,
        paddingVertical: 5,
        minHeight: 60,
    },
    taskSubContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    taskMainContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
    },
    paidBy : {
        color : '#bbb',
        fontSize : 12,
        width : '90%',
    },
    amtlent: {
        fontSize : 18,
        fontWeight : 'bold',
        color : '#2a2',
    },
    amtborr: {
        fontSize : 18,
        fontWeight : 'bold',
        color : '#c11'
    },
    task: {
        fontWeight : 'bold',
        color: '#eee',
        width: '90%',
        fontSize: 16,
    },
    dateText : {
        fontWeight : 'bold',
        color : '#b3b3b3',
        fontSize : 15,
        textAlign: 'center'
    },
    icon : {
        marginLeft:5,
        color : '#aaa'
    }
});
