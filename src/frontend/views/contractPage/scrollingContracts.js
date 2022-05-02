import React, {useEffect, useState} from 'react'
// eslint-disable-next-line no-unused-vars
import {FlatList, ImageBackground, RefreshControl, StyleSheet, View} from 'react-native'
import {BACKEND} from '../../utils/config'
// eslint-disable-next-line no-unused-vars
import ContratValidation from './contratValidation'
// eslint-disable-next-line no-unused-vars
import Contract from './contract'

const axios = require('axios')

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

const ScrollingContracts = ({route, navigation}) => {

    const ID = JSON.stringify(route.params.userData.userId)
    const [contracts, setContracts] = useState({})

    const [refreshing, setRefreshing] = React.useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        getContrats()
        wait(2000).then(() => setRefreshing(false))
    }, [])

    async function getContrats() {
        if (route.params.type === 'consumer') {
            try {
                const response = await axios.get(`${BACKEND}/consumers/` + ID + '/contracts', {
                    headers: {'x-access-token': route.params.userData.idToken}
                })
                setContracts(response.data.data)
            } catch (error) {
                console.error(error)
            }
        } else {
            try {
                const response = await axios.get(`${BACKEND}/producers/` + ID + '/contracts', {
                    headers: {'x-access-token': route.params.userData.idToken}
                })
                setContracts(response.data.data)
            } catch (error) {
                console.error(error)
            }
        }
    }

    useEffect(() => {
        getContrats()
    }, [])

    const renderItem = ({item}) => {
        if (item.status === 0) {
            return (
                <ContratValidation
                    name={item.name}
                    firstName={item.firstName}
                    mail={item.email}
                    product={item.contractProduct}
                    quantity={item.quantityForConsumer}
                    unit={item.unit}
                    start={item.beginningContract}
                    duration={item.durationContract}
                    userData={route.params.userData}
                    route={route}
                    navigation={navigation}
                    pid={item.proposalId}
                    cid={item.contractId}
                    type={route.params.type}
                    refresh={onRefresh}
                />)
        } else {
            return (
                <Contract
                    name={item.name}
                    firstName={item.firstName}
                    mail={item.email}
                    product={item.contractProduct}
                    quantity={item.quantityForConsumer}
                    unit={item.unit}
                    start={item.beginningContract}
                    duration={item.durationContract}
                    userData={route.params.userData}
                    route={route}
                    navigation={navigation}
                    pid={item.proposalId}
                    type={route.params.type}
                />)
        }
    }

    return (
        <View>
            <ImageBackground style={styles.imgBackground} resizeMode="cover"
                source={require('../../ressources/home/blue-background.png')}>
                <FlatList
                    removeClippedSubviews={false}
                    data={contracts}
                    renderItem={renderItem}
                    style={styles.list}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    imgBackground: {
        height: '100%',
        width: '100%',
    },

    list: {
        margin: 20
    }
})

export default ScrollingContracts
