// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
// eslint-disable-next-line no-unused-vars
import {Button, StyleSheet, Text, TextInput, View} from 'react-native'

import {BACKEND} from '../../utils/config'
import moment from 'moment'

const axios = require('axios')

const ContratValidation = props => {

    function validationContract() {
        const regex = /^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/
        if (!start.match(regex)) alert('Veuillez remplir la date au format YYYY-MM-DD')
        else if (!moment(start).isAfter(moment().subtract(1, 'days'))) alert('Veuillez remplir une date postérieur au début du contrat')
        else {
            const body = {beginningContract: start}
            axios.put(`${BACKEND}/producers/${userData.userId}/contracts/${props.cid}`, body, {
                headers: {'x-access-token': userData.idToken}
            })
                .catch(error => console.error(error))
            alert('Contrat validé')
            props.refresh()
            props.navigation.navigate('Liste des Contrats', {userData: userData, type: props.route.params.type})
        }
    }

    function deleteContract() {
        axios.delete(`${BACKEND}/producers/${userData.userId}/contracts/${props.cid}`, {
            headers: {'x-access-token': userData.idToken}
        }).catch(error => console.error(error))
        alert('Contrat refusé')
        props.refresh()
        props.navigation.navigate('Liste des Contrats', {userData: userData, type: props.route.params.type})
    }


    const userData = props.route.params.userData

    const [start, setStart] = useState('')


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
            <Text style={styles.text}>Durée du contrat en semaine(s) : {props.duration}</Text>
            {props.type === 'producer' ? <View style={styles.horizontal}>

                <Text style={styles.text}>Date de début du contrat : </Text>

                <TextInput
                    style={styles.textInput}
                    importantForAutofill={'yes'}
                    value={start}
                    onChangeText={setStart}
                />
            </View> : null}

            {props.type === 'producer' ? <View style={styles.footer}>
                <Button
                    title="Valider le contrat"
                    onPress={validationContract}
                />
                <View style={styles.btw}></View>
                <Button
                    title="Refuser le contrat"
                    onPress={deleteContract}
                />

            </View> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    btw: {
        height: 7
    },
    cadre: {
        backgroundColor: '#fac881',
        borderColor: 'black',
        borderWidth: 2,
        display: 'flex',
        margin: 5,
        padding: 10
    },
    center: {
        textAlign: 'start'
    },
    footer: {
        alignSelf: 'center',
        width: 200,
    },
    horizontal: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    text: {
        color: 'black',
        fontSize: 15
    },

    textInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        color: 'black',
        height: 27,
        marginBottom: 10,
        marginTop: 3,
        padding: 5,
        width: 95
    }
})

export default ContratValidation

