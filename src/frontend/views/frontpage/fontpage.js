// eslint-disable-next-line no-unused-vars
import React from 'react'
// eslint-disable-next-line no-unused-vars
import {Button, ImageBackground, StyleSheet, Text, View} from 'react-native'
// eslint-disable-next-line no-unused-vars
import MyButton from '../myButton'


const Fontpage = ({navigation}) => {


    return (
        <View style={styles.global}>
            <ImageBackground style={styles.imgBackground} resizeMode="cover"
                source={require('../../ressources/home/blue-background.png')}>
                <View style={styles.body}>
                    <Text style={styles.title}>AM'APP </Text>
                    <View style={styles.div}>
                        <Text style={styles.qui}>Déjà membre ?</Text>
                        <MyButton title="Se connecter" onPress={() => navigation.navigate('Login')}/>
                    </View>
                    <View style={styles.div}>
                        <Text style={styles.qui}>Première fois sur l'application ?</Text>
                        <MyButton title="S'enregistrer" onPress={() => navigation.navigate('Register')}/>
                    </View>
                    <Button title="Voir les propositions en tant qu'invité"
                        onPress={() => navigation.navigate('Liste des Propositions', {
                            userData: {userId: 1},
                            type: 'guest'
                        })}
                        style={styles.follow}/>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        display: 'flex',
        flexGrow: 100,
        justifyContent: 'space-around',
    },

    div: {
        alignItems: 'center',
        width: 200,
    },

    follow: {
        alignSelf: 'flex-end'
    },

    imgBackground: {
        height: '100%',
        width: '100%',
    },

    qui: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },

    title: {
        alignItems: 'center',
        alignSelf: 'center',
        color: 'white',
        fontSize: 60,
        fontStyle: 'italic',
        marginTop: 40,
        textShadowColor: '#585858',
        textShadowOffset: {width: 4, height: 4},
        textShadowRadius: 10,
    },

})

export default Fontpage
