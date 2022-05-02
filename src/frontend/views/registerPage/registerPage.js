// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
// eslint-disable-next-line no-unused-vars
import {ImageBackground, StyleSheet, Text, TextInput, View} from 'react-native'
// eslint-disable-next-line no-unused-vars
import MyButton from '../myButton'
// eslint-disable-next-line no-unused-vars
import {Menu, MenuItem} from 'react-native-material-menu'
import {BACKEND} from '../../utils/config'

const axios = require('axios')


const RegisterPage = ({navigation}) => {

    const [visible, setVisible] = useState(false)

    const hideMenu = () => setVisible(false)

    const showMenu = () => setVisible(true)

    const [state, setState] = useState('Choisissez le type de compte souhaité')

    const [name, setName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [type, setType] = useState('')

    function register() {

        if (!name || !firstName || !address || !email || !type) {
            alert('Veuillez remplir tous les champs')
        } else {
            const body = {
                name,
                firstName,
                address,
                email
            }
            axios.post(`${BACKEND}/${type}`, body).then(navigation.navigate('Accueil')).catch(error => console.error(error))
        }
    }

    function chooseConsumer() {
        hideMenu()
        setState('Consomateur')
        setType('consumers')
    }

    function chooseProducer() {
        hideMenu()
        setState('Producteur')
        setType('producer')
    }


    return (
        <View>
            <ImageBackground style={styles.imgBackground} resizeMode="cover"
                source={require('../../ressources/home/blue-background.png')}>
                <View style={styles.header}>
                    <Text style={styles.title}>Création d'un nouveau compte</Text>
                </View>
                <View style={styles.body}>
                    <Menu
                        visible={visible}
                        anchor={<Text style={styles.box} onPress={showMenu}>{state}</Text>}
                        onRequestClose={hideMenu}
                    >
                        {/* eslint-disable-next-line react-native/no-raw-text */}
                        <MenuItem onPress={chooseConsumer} contentStyle={styles.text}>Consomateur</MenuItem>
                        {/* eslint-disable-next-line react-native/no-raw-text */}
                        <MenuItem onPress={chooseProducer} contentStyle={styles.text}>Producteur</MenuItem>
                    </Menu>

                    <View style={styles.page}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Nom"
                            placeholderTextColor="grey"
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Prénom"
                            placeholderTextColor="grey"
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Adresse"
                            placeholderTextColor="grey"
                            onChangeText={setAddress}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email de votre compte google"
                            placeholderTextColor="grey"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                        />
                    </View>

                </View>

                <View style={styles.footer}>
                    <MyButton
                        title="S'enregister"
                        onPress={register}
                    />
                </View>
            </ImageBackground>


        </View>
    )
}

const styles = StyleSheet.create({

    body: {
        alignItems: 'center',
        display: 'flex'
    },

    box: {
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        borderWidth: 1,
        color: 'black',
        padding: 10
    },

    footer: {
        alignSelf: 'center',
        marginTop: 40,
        width: 160,
    },

    imgBackground: {
        height: '100%',
        width: '100%',
    },

    page: {
        marginTop: 30,
    },

    text: {
        color: 'black',
        fontSize: 16,
    },

    textInput: {
        backgroundColor: 'white',
        borderColor: 'purple',
        borderWidth: 1,
        color: 'black',
        height: 40,
        margin: 12,
        padding: 10,
        width: 250
    },

    title: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 30,
        margin: 30,
        textAlign: 'center',
        textShadowColor: '#585858',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
    }

})


export default RegisterPage
