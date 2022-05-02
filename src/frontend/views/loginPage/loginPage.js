// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
// eslint-disable-next-line no-unused-vars
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
// eslint-disable-next-line no-unused-vars
import MyButton from '../myButton'
import oauth2Login from '../../utils/oauth2'

const LoginPage = ({navigation}) => {

    const [profile, setProfile] = useState('Qui êtes vous?')
    const [type, setType] = useState('')
    const [filled, setFilled] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [authError, setAuthError] = useState(false)
    const [userData, setUserData] = useState({
        userId: -1,
        firstName: null,
        name: null,
        address: null,
        email: null,
        consumer: false,
        producer: false,
        organizer: false,
        accessToken: null,
        accessTokenExpirationDate: null,
        idToken: null,
        refreshToken: null
    })

    useEffect(() => {
        if (userData.userId > 0) {
            navigation.navigate('Home', {userData, type})
        }
    }, [userData])

    return (<View style={styles.page}>
        <ImageBackground style={styles.imgBackground} resizeMode="cover"
            source={require('../../ressources/home/blue-background.png')}>

            <Text style={styles.qui}> {profile}</Text>
            {profile === 'Qui êtes vous?' && clicked ?
                <Text style={styles.error}>Merci de sélectionner un profil</Text> : <Text style={styles.error}/>}
            {authError ? <Text style={styles.error}>Authentification échouée. Réessayez !</Text> : null}
            <View style={styles.selection}>

                <TouchableOpacity activeOpacity={0.8}
                    style={type === 'consumer' ? styles.buttonSelected : styles.button}
                    onPress={() => {
                        setProfile('Vous êtes un consommateur')
                        setType('consumer')
                        setFilled(true)
                    }}>
                    <Text style={styles.buttonText}>Consommateur</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8}
                    style={type === 'producer' ? styles.buttonSelected : styles.button}
                    onPress={() => {
                        setProfile('Vous êtes un producteur')
                        setType('producer')
                        setFilled(true)
                    }}>
                    <Text style={styles.buttonText}>Producteur</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8}
                    style={type === 'organizer' ? styles.buttonSelected : styles.button}
                    onPress={() => {
                        setProfile('Vous êtes un organisateur')
                        setType('organizer')
                        setFilled(true)
                    }}>
                    <Text style={styles.buttonText}>Organisateur</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.page}>
                <MyButton
                    title="Connexion"
                    onPress={async () => {
                        setClicked(true)
                        if (filled) {
                            try {
                                const respData = await oauth2Login()
                                if ((!respData.consumer && type === 'consumer') || (!respData.producer && type === 'producer') || (!respData.organizer && type === 'organizer')) {
                                    console.error(`The user is not a ${type}`)
                                    setAuthError(true)
                                } else {
                                    setAuthError(false)
                                    setUserData(respData)
                                }
                            } catch (error) {
                                console.error(error)
                                setAuthError(true)
                            }
                        }
                    }}
                />
            </View>
        </ImageBackground>
    </View>)
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderColor: 'purple',
        borderRadius: 3,
        borderWidth: 1,
        margin: 5,
        padding: 5,
        width: 150
    },

    buttonSelected: {
        backgroundColor: 'darkgrey',
        borderColor: 'purple',
        borderRadius: 3,
        borderWidth: 1,
        margin: 5,
        padding: 5,
        width: 150
    },


    buttonText: {
        color: 'black', fontSize: 18, fontWeight: 'bold', textAlign: 'center',

    },

    error: {
        alignSelf: 'center', color: 'red', fontSize: 20, height: 30, marginTop: 20,
    },

    imgBackground: {
        height: '100%', width: '100%',
    },

    page: {
        alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
    },

    qui: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 30,
        height: 100,
        marginTop: 50,
        textAlign: 'center',
        textShadowColor: '#585858',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
        width: 250,
    },

    selection: {
        alignItems: 'center',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: 200,
        justifyContent: 'space-around',
        marginBottom: 50,
        marginTop: 30,
        width: 200,
    },

})

export default LoginPage
