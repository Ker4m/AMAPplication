import React, {useEffect, useState} from 'react'
// eslint-disable-next-line no-unused-vars
import {FlatList, ImageBackground, RefreshControl, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native'
import {BACKEND} from '../../utils/config'

const axios = require('axios')
const moment = require('moment')
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

const Planning = ({route}) => {


    const [refreshing, setRefreshing] = React.useState(false)
    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        getPlanning()
        wait(1000).then(() => setRefreshing(false))
    }, [])

    const ID = Number(route.params.userData.userId)
    const type = route.params.type

    const [actives, setActives] = useState([])
    const [availables, setAvailables] = useState([])
    const [permanence, setPermanence] = useState([])

    async function getPlanning() {
        if (type === 'consumer') {
            try {
                const response = await axios.get(`${BACKEND}/consumers/${ID}/active`, {
                    headers: {'x-access-token': route.params.userData.idToken}
                })
                setActives(response.data.data)
            } catch (error) {
                console.error(error)
            }
        }

        try {
            const response = await axios.get(`${BACKEND}/consumers/permanence`, {
                headers: {'x-access-token': route.params.userData.idToken}
            })
            setPermanence(response.data.data)
        } catch (error) {
            console.error(error)
        }

        if (type === 'organizer') {
            try {
                const response = await axios.get(`${BACKEND}/consumers/available`, {
                    headers: {'x-access-token': route.params.userData.idToken}
                })
                setAvailables(response.data.data)
            } catch (error) {
                console.error(error)
            }
        }
    }


    function validationCreneaux(date) {
        const body = {date: date}
        axios.post(`${BACKEND}/consumers/${ID}/available`, body, {
            headers: {'x-access-token': route.params.userData.idToken}
        })
            .catch(error => console.error(error))
    }

    function desinscriptionCreneaux(date) {
        const body = {date: date}
        axios.put(`${BACKEND}/consumers/${ID}/available`, body, {
            headers: {'x-access-token': route.params.userData.idToken}
        })
            .catch(error => console.error(error))
    }

    function inscriptionPerma(item, i) {
        const now = moment()
        const nextMonday = now.startOf('isoWeek').add(i, 'week').format('YYYY-MM-DD')
        const body = {date: nextMonday}
        axios.post(`${BACKEND}/consumers/${item.item.userId}/permanence`, body, {
            headers: {'x-access-token': route.params.userData.idToken}
        })
            .catch(error => console.error(error))
    }

    function desinscriptionPerma(item, i) {
        const now = moment()
        const nextMonday = now.startOf('isoWeek').add(i, 'week').format('YYYY-MM-DD')
        const body = {date: nextMonday}
        axios.put(`${BACKEND}/consumers/${item.item.userId}/permanence`, body, {
            headers: {'x-access-token': route.params.userData.idToken}
        })
            .catch(error => console.error(error))

    }

    useEffect(() => {
        getPlanning()
    }, [])

    const renderActives = ({item}) => {
        return (
            <View style={styles.bodyActive}>
                <Text style={styles.text}>{item}</Text>
                <View style={styles.butyesno}>
                    <Text style={styles.text}>Etes-vous disponible ?</Text>
                    <View style={styles.bodyContent}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => {
                            validationCreneaux(item)
                            alert('Votre choix a été pris en compte mais vous pouvez toujours le modifier')
                            onRefresh()
                        }}>
                            <Text style={styles.buttonText}>Oui</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => {
                            desinscriptionCreneaux(item)
                            alert('Votre choix a été pris en compte mais vous pouvez toujours le modifier')
                            onRefresh()
                        }}>
                            <Text style={styles.buttonText}>Non</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>)
    }

    const renderActivePeople = (item, i) => {
        return (
            <View style={styles.availCard}>
                <Text style={styles.textCard}>{item.item.name}</Text>
                <Text style={styles.textCard}>{item.item.firstName}</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.buttonCard} onPress={() => {
                    inscriptionPerma(item, i)
                    alert('Votre choix a été pris en compte mais vous pouvez toujours le modifier')
                    onRefresh()
                }}>
                    <Text>Assigner</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.buttonCard} onPress={() => {
                    desinscriptionPerma(item, i)
                    alert('Votre choix a été pris en compte mais vous pouvez toujours le modifier')
                    onRefresh()
                }}>
                    <Text>Retirer</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderPermaPeople = ({item}) => {
        return (
            <View style={styles.availCard}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => alert(item.email)}>
                    <Text style={styles.textCard}>{item.name}</Text>
                    <Text style={styles.textCard}>{item.firstName}</Text>
                </TouchableOpacity>
            </View>
        )
    }


    return (

        <View>
            <ImageBackground style={styles.imgBackground} resizeMode="cover"
                source={require('../../ressources/home/blue-background.png')}>
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={styles.title}>Planning </Text>
                    </View>

                    <View style={styles.body}>

                        {type === 'consumer' ?
                            <Text style={styles.description}>Vos semaines actives parmis les 4 prochaines semaines
                            :</Text> : null}
                        {type === 'consumer' ? <FlatList
                            data={actives}
                            renderItem={renderActives}
                        /> : null}

                        {type === 'organizer' ?
                            <Text style={styles.description}>Personnes disponibles pour les 4 prochaines semaines
                            :</Text> : null}
                        {type === 'organizer' ? <View style={styles.availables}>
                            <View style={styles.col}>
                                <Text style={styles.tabTitle}>Semaine 1</Text>
                                <FlatList
                                    data={availables[0]}
                                    renderItem={(item) => renderActivePeople(item, 1)}
                                />
                            </View>
                            <View style={styles.col}>
                                <Text style={styles.tabTitle}>Semaine 2</Text>
                                <FlatList
                                    data={availables[1]}
                                    renderItem={(item) => renderActivePeople(item, 2)}
                                />
                            </View>
                            <View style={styles.col}>
                                <Text style={styles.tabTitle}>Semaine 3</Text>
                                <FlatList
                                    data={availables[2]}
                                    renderItem={(item) => renderActivePeople(item, 3)}
                                />
                            </View>
                            <View style={styles.col}>
                                <Text style={styles.tabTitle}>Semaine 4</Text>
                                <FlatList
                                    data={availables[3]}
                                    renderItem={(item) => renderActivePeople(item, 4)}
                                />
                            </View>
                        </View> : null}
                        <Text style={styles.description}>Personnes assignées aux permanences pour les 4 prochaines semaines
                        : </Text>
                        <View style={styles.availables}>
                            <View style={styles.col}>
                                <Text style={styles.tabTitle}>Semaine 1</Text>
                                <FlatList
                                    data={permanence[0]}
                                    renderItem={renderPermaPeople}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                        />
                                    }
                                />
                            </View>

                            <View style={styles.col}>
                                <Text style={styles.tabTitle}>Semaine 2</Text>
                                <FlatList
                                    data={permanence[1]}
                                    renderItem={renderPermaPeople}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                        />
                                    }
                                />
                            </View>

                            <View style={styles.col}>
                                <Text style={styles.tabTitle}>Semaine 3</Text>
                                <FlatList
                                    data={permanence[2]}
                                    renderItem={renderPermaPeople}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                        />
                                    }
                                />
                            </View>

                            <View style={styles.col}>
                                <Text style={styles.tabTitle}>Semaine 4</Text>
                                <FlatList
                                    data={permanence[3]}
                                    renderItem={renderPermaPeople}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                        />
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    availCard: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'purple',
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 5,
        padding: 5,
        width: '95%'
    },


    availables: {
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginHorizontal: 3,
        marginVertical: 20,
        paddingVertical: 4,
        width: '98%'
    },


    body: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 30,
        paddingBottom: 10

    },

    bodyActive: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'purple',
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 10,
        padding: 10
    },


    bodyContent: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    button: {
        backgroundColor: 'lightskyblue',
        borderRadius: 3,
        borderWidth: 1,
        marginHorizontal: 10,
        padding: 4
    },


    buttonCard: {
        backgroundColor: 'lightskyblue',
        borderRadius: 3,
        borderWidth: 1,
        marginVertical: 7,
        padding: 4
    },

    butyesno: {
        alignItems: 'baseline',
        display: 'flex',
        flexDirection: 'row'
    },

    col: {
        borderRightWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingRight: 5,
        width: '23%'
    },

    description: {
        bottom: 7,
        color: 'black',
        fontSize: 20,
        fontStyle: 'italic',
        paddingHorizontal: 10,
        textAlign: 'center'
    },

    imgBackground: {
        height: '100%',
        width: '100%',
    },

    tabTitle: {
        bottom: 7,
        color: 'black',
        fontSize: 16,
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center'

    },

    text: {
        color: 'black',
        fontSize: 15,
        marginBottom: 10,
    },

    textCard: {
        color: 'black',
        fontSize: 15,
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

export default Planning
