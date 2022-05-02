// eslint-disable-next-line no-unused-vars
import React from 'react'
// eslint-disable-next-line no-unused-vars
import {StyleSheet, Text, View} from 'react-native'

const Contract = props => {


    return (
        <View style={styles.cadre}>
            <View style={styles.horizontal}>
                <Text style={styles.text}>Nom : {props.name}</Text>
                <Text style={styles.text}>Prénom : {props.firstName}</Text>
            </View>
            <View style={styles.center}>
                <Text style={styles.text}>Mail : {props.mail}</Text>
            </View>
            <View style={styles.horizontal}>
                <Text style={styles.text}>Produit : {props.product}</Text>
                <Text style={styles.text}>Quantité : {props.quantity} {props.unit}</Text>
            </View>
            <View style={styles.center}>
                <Text style={styles.text}>Durée du contrat en semaine(s) : {props.duration}</Text>
                <Text style={styles.text}>Date de début du Contrat : {props.start}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cadre: {
        backgroundColor: '#98FB98',
        borderColor: 'black',
        borderWidth: 2,
        display: 'flex',
        margin: 5,
        padding: 10
    },
    center: {
        textAlign: 'start'
    },
    horizontal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        color: 'black',
        fontSize: 15
    }
}
)

export default Contract

