import React, {useEffect, useState} from 'react'
// eslint-disable-next-line no-unused-vars
import {FlatList, ImageBackground, RefreshControl, StyleSheet, View} from 'react-native'
// eslint-disable-next-line no-unused-vars
import ContratASigner from '../contractPage/ContratASigner'
// eslint-disable-next-line no-unused-vars
import MyButton from '../myButton'
import {BACKEND} from '../../utils/config'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

const axios = require('axios')

const ListeProposition = ({route, navigation}) => {
    React.useEffect(() => {
        return navigation.addListener('focus', () => {
            getProposition()
        })
    }, [navigation])

    const ID = Number(route.params.userData.userId)
    const type = route.params.type
    const producerDisplay = !type.localeCompare('producer')

    const [proposition, setProposition] = useState({})

    const [refreshing, setRefreshing] = React.useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        getProposition()
        wait(2000).then(() => setRefreshing(false))
    }, [])

    async function getProposition() {
        try {
            if (producerDisplay) {
                const response = await axios.get(`${BACKEND}/producers/${ID}/proposals`, {
                    headers: {'x-access-token': route.params.userData.idToken}
                })
                setProposition(response.data.data)
            } else {
                const response = await axios.get(`${BACKEND}/producers/proposals`)
                setProposition(response.data.data)
            }
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getProposition()
    }, [])


    const renderItem = ({item}) => (<ContratASigner
        producer={item.name + ' ' + item.firstName}
        mail={item.email}
        product={item.product}
        quantity={item.quantity}
        unit={item.unit}
        start={item.beginningProposal}
        duration={item.duration}
        display={producerDisplay}
        userData={route.params.userData}
        route={route}
        navigation={navigation}
        pid={item.proposalId}
        type={route.params.type}
    />)

    return (<View style={styles.global}>
        <ImageBackground style={styles.imgBackground} resizeMode="cover"
            source={require('../../ressources/home/blue-background.png')}>
            {producerDisplay ? <View style={styles.header}>
                <MyButton title="Créer une proposition"
                    onPress={() => navigation.navigate('Création Proposition', {
                        userData: route.params.userData, type: type
                    })}/>
            </View> : null}
            <View style={styles.body}>
                <FlatList
                    style={styles.scrolling}
                    data={proposition}
                    renderItem={renderItem}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />}
                />
            </View>
        </ImageBackground>
    </View>)
}

const styles = StyleSheet.create({

    body: {
        height: '100%', marginTop: 30, width: '100%'
    },

    global: {
        display: 'flex',
    },

    header: {
        alignSelf: 'center', margin: 10, width: 250,
    },

    imgBackground: {
        height: '100%', width: '100%',
    },

    scrolling: {
        marginBottom: 30,
    }
})

export default ListeProposition
