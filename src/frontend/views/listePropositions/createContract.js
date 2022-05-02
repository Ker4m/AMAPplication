// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
// eslint-disable-next-line no-unused-vars
import {ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
// eslint-disable-next-line no-unused-vars
import MyButton from '../myButton'
import {BACKEND} from '../../utils/config'


const axios = require('axios')


const CreateContract = ({route, navigation}) => {


    const [quantity, setQuantity] = useState('')


    function postContract() {
        const body = {quantityForConsumer: Number(quantity), unitForConsumer: contract.unit}
        if (body.quantityForConsumer <= 0) alert('Veuillez renseigner une quantité valide')
        axios.post(`${BACKEND}/consumers/${userData.userId}/proposals/${contract.pid}`, body, {
            headers: {'x-access-token': route.params.userData.idToken}
        })
            .catch(error => console.error(error))

        navigation.navigate('Liste des Propositions', {userData: route.params.userData, type: route.params.type})
        alert('Contrat proposé au producteur')
    }

    const userData = route.params.userData
    const contract = route.params.contract


    return (

        <View style={styles.container}>
            <ImageBackground style={styles.imgBackground} resizeMode="cover"
                source={require('../../ressources/home/blue-background.png')}>
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={styles.title}>Nouveau Contrat</Text>
                    </View>
                    <View style={styles.bodyContent}>
                        <Text style={styles.info}>Producteur</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <Text style={styles.description}>{contract.producer}</Text>
                        </TouchableOpacity>

                        <Text style={styles.info}>mail</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <Text style={styles.description}>{contract.mail}</Text>
                        </TouchableOpacity>

                        <Text style={styles.info}>Durée en semaines</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <Text style={styles.description}>{contract.duration}</Text>
                        </TouchableOpacity>

                        <Text style={styles.info}>Produit</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <Text style={styles.description}>{contract.product}</Text>
                        </TouchableOpacity>

                        <Text style={styles.info}>Quantité Maximale annoncée</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <Text style={styles.description}>{contract.quantity}</Text>
                        </TouchableOpacity>

                        <Text style={styles.info}>Quantité</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <TextInput style={styles.description} value={quantity} onChangeText={setQuantity}/>
                        </TouchableOpacity>

                        <Text style={styles.info}>Unité</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <Text style={styles.description}>{contract.unit}</Text>
                        </TouchableOpacity>

                        <Text style={styles.info}>Date de début</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <Text style={styles.description}>{contract.start}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.footer}>
                        <MyButton title="   Créer  " onPress={postContract}/>
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

export default CreateContract
