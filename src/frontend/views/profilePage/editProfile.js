// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
// eslint-disable-next-line no-unused-vars
import {Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {BACKEND} from '../../utils/config'
// eslint-disable-next-line no-unused-vars
import MyButton from '../myButton'

const axios = require('axios')


const EditProfile = ({route, navigation}) => {

    const ID = Number(route.params.userData.userId)
    const type = route.params.type

    const [user, setUser] = useState({})
    const [name, setName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [address, setAddress] = useState('')

    async function getUser() {
        try {
            const response = await axios.get(`${BACKEND}` + '/' + type + 's/' + ID, {
                headers: {'x-access-token': route.params.userData.idToken}
            })
            setUser(response.data.data)
            setName(response.data.data.name)
            setFirstName(response.data.data.firstName)
            setAddress(response.data.data.address)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])


    function postProfile() {

        if (name && firstName && address) {
            const body = {name: name, firstName: firstName, email: user.email, address: address}
            axios.put(`${BACKEND}` + '/' + type + 's/' + ID, body, {
                headers: {'x-access-token': route.params.userData.idToken}
            })
                .catch(error => console.error(error))
            navigation.navigate('Profil', {
                userData: route.params.userData,
                userId: route.params.userData.userId,
                type: type
            })
        } else {
            alert('Veuillez remplir tous les champs')
        }
    }

    return (

        <View>
            <ImageBackground style={styles.imgBackground} resizeMode="cover"
                source={require('../../ressources/home/blue-background.png')}>
                <ScrollView>

                    <View style={styles.header}>
                        <Text style={styles.profil}>Profil</Text>
                        <Image style={styles.avatar} source={require('../../ressources/profile/default-icon.png')}/>
                    </View>

                    <View style={styles.body}>

                        <Text style={styles.info}>Nom</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.editableContainer}>
                            <TextInput multiline={true} style={styles.description} value={name}
                                onChangeText={setName}/>
                        </TouchableOpacity>

                        <Text style={styles.info}>Prénom</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.editableContainer}>
                            <TextInput multiline={true} style={styles.description} value={firstName}
                                onChangeText={setFirstName}/>
                        </TouchableOpacity>

                        <Text style={styles.info}>Email</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <Text style={styles.description}>{user.email}</Text>
                        </TouchableOpacity>

                        <Text style={styles.info}>Adresse</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.editableContainer}>
                            <TextInput multiline={true} style={styles.description} value={address}
                                onChangeText={setAddress}/>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.footer}>
                        <MyButton title="Sauvegarder" onPress={() => {
                            postProfile()
                        }}/>
                    </View>

                </ScrollView>
            </ImageBackground>
        </View>


    )
}

const styles = StyleSheet.create({

    avatar: {
        alignSelf: 'center',
        backgroundColor: 'white',
        borderColor: 'darkblue',
        borderRadius: 63,
        borderWidth: 2,
        height: 130,
        marginBottom: 10,
        marginTop: 130,
        position: 'absolute',
        width: 130
    },

    body: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: 40,
        padding: 30,
    },

    buttonContainer: {
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        borderColor: 'purple',
        borderRadius: 30,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 10,
        minHeight: 45,
        paddingLeft: 10,
        paddingRight: 10,
        width: 250
    },

    description: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        width: '100%',
    },


    editableContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'purple',
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 10,
        minHeight: 45,
        paddingLeft: 10,
        paddingRight: 10,
        width: 250
    },

    footer: {
        alignSelf: 'center',
        marginBottom: 40,
    },

    header: {
        borderBottomColor: 'darkblue',
        borderBottomWidth: 2,
        height: 200,
    },

    info: {
        color: 'black',
        fontSize: 22,
        fontWeight: '600',
        marginTop: 10,
    },

    profil: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 60,
        fontStyle: 'italic',
        marginTop: 30,
        position: 'absolute',
        textAlign: 'center',
        textShadowColor: '#585858',
        textShadowOffset: {width: 4, height: 4},
        textShadowRadius: 10,
        width: 200,
    }

})


export default EditProfile
