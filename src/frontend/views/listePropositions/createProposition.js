// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
// eslint-disable-next-line no-unused-vars
import {ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
// eslint-disable-next-line no-unused-vars
import MyButton from '../myButton'
import {BACKEND} from '../../utils/config'

const moment = require('moment')
const axios = require('axios')


const CreateProposition = ({route, navigation}) => {

    const ID = Number(route.params.userData.userId)
    const type = route.params.type


    const [duration, setDuration] = useState('')
    const [product, setProduct] = useState('')
    const [quantity, setQuantity] = useState('')
    const [unit, setUnit] = useState('')
    const [beginning, setBeginning] = useState('')


    function postProposition() {
        if (duration && product && quantity && unit && beginning) {
            const regex = /^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/
            if (duration <= 0) alert('Veuillez renseigner une durée valide')
            else if (quantity <= 0) alert('Veuillez renseigner une quantité valide')
            else if (!beginning.match(regex)) alert('Veuillez remplir la date au format YYYY-MM-DD')
            else if (moment(beginning).isAfter(moment().subtract(1, 'days'))) {
                const body = {
                    duration: Number(duration),
                    product: product,
                    quantity: Number(quantity),
                    unit: unit,
                    beginningProposal: beginning
                }
                axios.post(`${BACKEND}/producers/${ID}/proposals`, body, {
                    headers: {'x-access-token': route.params.userData.idToken}
                })
                    .catch(error => console.error(error))
                navigation.navigate('Liste des Propositions', {userData: route.params.userData, type: type})
            } else {
                alert('Veuillez renseigner une date valide')
            }
        } else {
            alert('Veuillez remplir tous les champs')
        }
    }

    return (

        <View style={styles.container}>
            <ImageBackground style={styles.imgBackground} resizeMode="cover"
                source={require('../../ressources/home/blue-background.png')}>
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={styles.title}>Nouvelle Proposition</Text>
                    </View>
                    <View style={styles.bodyContent}>
                        <Text style={styles.info}>Durée (en semaine)</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <TextInput style={styles.description} placeholder="12" placeholderTextColor="grey"
                                value={duration}
                                onChangeText={setDuration}/>
                        </TouchableOpacity>

                        <Text style={styles.info}>Produit</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <TextInput style={styles.description} placeholder="Carotte" placeholderTextColor="grey"
                                value={product}
                                onChangeText={setProduct}/>
                        </TouchableOpacity>

                        <Text style={styles.info}>Quantité</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <TextInput style={styles.description} placeholder="1" placeholderTextColor="grey"
                                value={quantity}
                                onChangeText={setQuantity}/>
                        </TouchableOpacity>

                        <Text style={styles.info}>Unité</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <TextInput style={styles.description} placeholder="Kg" placeholderTextColor="grey"
                                value={unit}
                                onChangeText={setUnit}/>
                        </TouchableOpacity>

                        <Text style={styles.info}>Date de début</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <TextInput style={styles.description} placeholder="2022-05-29" placeholderTextColor="grey"
                                value={beginning}
                                onChangeText={setBeginning}/>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.footer}>
                        <MyButton title="   Créer  " onPress={postProposition}/>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>


    )
}

const styles = StyleSheet.create({

    bodyContent: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 10,
    },

    buttonContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'purple',
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 10,
        minHeight: 45,
        paddingLeft: 10,
        paddingRight: 10,
        width: '70%'
    },


    description: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        width: '100%',

    },


    footer: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 20,
    },

    header: {
        alignItems: 'center',
        height: 100,
    },

    imgBackground: {
        height: '100%',
        width: '100%',
    },

    info: {
        color: 'black',
        fontSize: 22,
        fontWeight: '600',
        marginTop: 10,
    },

    title: {
        alignItems: 'center',
        alignSelf: 'center',
        color: 'white',
        fontSize: 36,
        marginTop: 30,
        position: 'absolute',
        textAlign: 'center',
        textShadowColor: '#585858',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 10,
        width: 350,
    },

})

export default CreateProposition
