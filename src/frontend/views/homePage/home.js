// eslint-disable-next-line no-unused-vars
import React from 'react'
// eslint-disable-next-line no-unused-vars
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native'


const HomePage = ({route, navigation}) => {

    const ID = JSON.stringify(route.params.userData.userId)
    const type = route.params.type

    return (

        <View style={styles.container}>
            <ImageBackground style={styles.imgBackground} resizeMode="cover"
                source={require('../../ressources/home/blue-background.png')}>
                <View style={styles.header}>
                    <Text style={styles.title}>Bienvenue </Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        {type !== 'organizer' ? <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}
                            onPress={() => navigation.navigate('Profil', {
                                userId: ID,
                                type: type,
                                userData: route.params.userData
                            })}>
                            <Image style={styles.icon}
                                source={require('../../ressources/home/icons8-user-male-128-bis.png')}/>
                            <Text style={styles.description}>Profil</Text>
                        </TouchableOpacity> : null}


                        <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}
                            onPress={() => navigation.navigate('Planning', {
                                userData: route.params.userData,
                                type: type
                            })}>
                            <Image style={styles.icon}
                                source={require('../../ressources/home/icons8-bookmark-128.png')}/>
                            <Text style={styles.description}>Planning</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.bodyContent}>
                        {type !== 'organizer' ? <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}
                            onPress={() => navigation.navigate('Liste des Contrats', {
                                userData: route.params.userData,
                                type: type
                            })}>
                            <Image style={styles.icon}
                                source={require('../../ressources/home/icons8-document-128.png')}/>
                            <Text style={styles.description}>Contrats</Text>
                        </TouchableOpacity> : null}

                        {type !== 'organizer' ? <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}
                            onPress={() => navigation.navigate('Liste des Propositions', {
                                userData: route.params.userData,
                                type: type
                            })}>
                            <Image style={styles.icon} source={require('../../ressources/home/icons8-info-128.png')}/>
                            <Text style={styles.description}>Propositions</Text>
                        </TouchableOpacity> : null}

                        {type === 'organizer' ? <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}
                            onPress={() => navigation.navigate('Historique', {
                                userData: route.params.userData,
                                type: type
                            })}>
                            <Image style={styles.icon} source={require('../../ressources/home/icons8-info-128.png')}/>
                            <Text style={styles.description}>Historique</Text>
                        </TouchableOpacity> : null}
                    </View>

                    <TouchableOpacity activeOpacity={0.8} style={styles.buttonContainer}
                        onPress={() => navigation.navigate('Accueil')}>
                        <Image style={styles.icon} source={require('../../ressources/home/icons8-lock-128.png')}/>
                        <Text style={styles.description}>Log out</Text>
                    </TouchableOpacity>


                </View>
            </ImageBackground>
        </View>


    )
}

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 20,

    },

    bodyContent: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    buttonContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'purple',
        borderRadius: 30,
        borderWidth: 1,
        elevation: 22,
        flexDirection: 'column',
        height: 120,
        justifyContent: 'flex-end',
        margin: 20,
        paddingLeft: 10,
        paddingRight: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,
        width: 120,
    },


    description: {
        bottom: 7,
        color: 'black',
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',

    },

    header: {
        height: 150,
    },


    icon: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        height: 70,
        top: -10,
        width: 70,

    },

    imgBackground: {
        height: '100%',
        width: '100%',
    },

    title: {
        alignItems: 'center',
        alignSelf: 'center',
        color: 'white',
        fontSize: 60,
        fontStyle: 'italic',
        marginTop: 40,
        position: 'absolute',
        textShadowColor: '#585858',
        textShadowOffset: {width: 4, height: 4},
        textShadowRadius: 10,

    }

})

export default HomePage
