// eslint-disable-next-line no-unused-vars
import React from 'react'
// eslint-disable-next-line no-unused-vars
import {Button, StyleSheet, Text, View} from 'react-native'

const ContratASigner = (props) => {

    const contract = {
        producer: props.producer,
        mail: props.mail,
        product: props.product,
        quantity: props.quantity,
        unit: props.unit,
        duration: props.duration,
        start: props.start,
        pid: props.pid,
    }

    function chooseContract() {
        props.navigation.navigate('Création Contrat', {userData: props.userData, contract: contract, type: props.type})
    }


    return (
        <View style={styles.cadre}>
            <View style={styles.center}>
                {!props.display ? <Text style={styles.text}>Producteur : {props.producer}</Text> : null}
                {!props.display ? <Text style={styles.text}>Mail : {props.mail}</Text> : null}
            </View>
            <View style={styles.center}>
                <Text style={styles.text}>Produit : {props.product}</Text>
                <Text style={styles.text}>Quantité : {props.quantity} {props.unit}</Text>
                <Text style={styles.text}>Durée du contrat en semaine: {props.duration}</Text>
                <Text style={styles.text}>Début : {props.start} </Text>
            </View>

            {!props.display && props.type !=='guest' ? <View style={styles.bot}>
                <Button
                    title="Proposer un contrat"
                    onPress={chooseContract}
                /> 
            </View>: null}
        </View>
    )
}

const styles = StyleSheet.create({
    bot: {
        alignSelf: 'center',
        marginTop: 20,
        width: 200
    },
    cadre: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        display: 'flex',
        marginHorizontal: 15,
        marginVertical: 5,
        padding: 7,
    },
    
    text: {
        color: 'black',
        fontSize: 16,
    }
}
)

export default ContratASigner
