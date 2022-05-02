// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
// eslint-disable-next-line no-unused-vars
import {Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {BACKEND} from '../../utils/config'
// eslint-disable-next-line no-unused-vars
import MyButton from '../myButton'

const axios = require('axios')


const ViewProfile = ({route, navigation}) => {

    const ID = Number(route.params.userData.userId)
    const type = route.params.type
    const [user, setUser] = useState({})

    async function getUser() {
        try {
            const response = await axios.get(`${BACKEND}/${type}s/` + ID, {
                headers: {'x-access-token': route.params.userData.idToken}
            })
            setUser(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])


    return (

        <View style={styles.container}>
            <ImageBackground style={styles.imgBackground} resizeMode="cover"
                source={require('../../ressources/home/blue-background.png')}>
                <ScrollView>

                    <View style={styles.header}>
                        <Text style={styles.profil}>Profil</Text>
                        <Image style={styles.avatar} source={require('../../ressources/profile/default-icon.png')}/>
                    </View>

                    <View style={styles.body}>
                        <Text style={styles.info}>Nom</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <Text style={styles.description}>{user.name}</Text>
                        </TouchableOpacity>

                        <Text style={styles.info}>Prénom</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <Text style={styles.description}>{user.firstName}</Text>
                        </TouchableOpacity>

                        <Text style={styles.info}>Email</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <Text style={styles.description}>{user.email}</Text>
                        </TouchableOpacity>

                        <Text style={styles.info}>Adresse</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}>
                            <Text style={styles.description}>{user.address}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <MyButton title="Modifier" onPress={() => navigation.navigate('Edition du Profil', {
                            userData: route.params.userData,
                            type: type
                        })}/>
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
        backgroundColor: 'white',
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

export default ViewProfile
