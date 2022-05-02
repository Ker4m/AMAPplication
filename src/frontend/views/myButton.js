// eslint-disable-next-line no-unused-vars
import React from 'react'
// eslint-disable-next-line no-unused-vars
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'


const MyButton = props => {

    return (
        <TouchableOpacity activeOpacity={0.8} classname="MyButton" onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.title} </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: 'lightgoldenrodyellow',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 2,
        margin: 10,
        padding: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
    },
})


export default MyButton
