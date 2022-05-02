// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
// eslint-disable-next-line no-unused-vars
import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native'
import {BACKEND} from '../../utils/config'

const axios = require('axios')

const Historique = ({route}) => {

    const [histo, setHisto] = useState([])

    async function getPlanning() {
        try {
            const response = await axios.get(`${BACKEND}/organizer/planning`, {
                headers: {'x-access-token': route.params.userData.idToken}
            })
            setHisto(response.data.data)
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        getPlanning()
    }, [])

    const renderItem = ({item}) => {
        console.log(item)
        return (
            <View style={styles.body}>
                <Text style={styles.text}>Date : {item.date}</Text>
                <Text style={styles.text}>{item.name} {item.firstName}</Text>
                <Text style={styles.text}>{item.email}</Text>
            </View>)
    }

    return (
        <View>
            <ImageBackground style={styles.imgBackground} resizeMode="cover"
                source={require('../../ressources/home/blue-background.png')}>
                <View style={styles.header}>
                    <Text style={styles.title}>Historique </Text>
                </View>
                <FlatList
                    data={histo}
                    renderItem={renderItem}
                    style={styles.tab}
                />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },

    imgBackground: {
        height: '100%',
        width: '100%',
    },

    tab: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        margin: 20,
        marginHorizontal: 10
    },

    text: {
        color: 'black',
        fontSize: 16
    },

    title: {
        alignItems: 'center',
        alignSelf: 'center',
        color: 'white',
        fontSize: 60,
        fontStyle: 'italic',
        justifyContent: 'center',
        textShadowColor: '#585858',
        textShadowOffset: {width: 4, height: 4},
        textShadowRadius: 10,

    }
})

export default Historique