/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// eslint-disable-next-line no-unused-vars
import React from 'react'
// eslint-disable-next-line no-unused-vars
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Fontpage from './views/frontpage/fontpage'
import LoginPage from './views/loginPage/loginPage'
import RegisterPage from './views/registerPage/registerPage'
import ScrollingContracts from './views/contractPage/scrollingContracts'
import ViewProfile from './views/profilePage/viewProfile'
import EditProfile from './views/profilePage/editProfile'
import HomePage from './views/homePage/home'
import ListeProposition from './views/listePropositions/listePropositions'
import CreateProposition from './views/listePropositions/createProposition'
import CreateContract from './views/listePropositions/createContract'
import Planning from './views/planningPage/planning'
import {BACKEND} from './utils/config'
import Historique from './views/history/history'


// eslint-disable-next-line no-unused-vars
const Stack = createNativeStackNavigator()

// eslint-disable-next-line no-unused-vars
const MyStack = (BACKEND) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Accueil"
                    component={Fontpage}
                    initialParams={{backend: BACKEND}}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginPage}
                    initialParams={{backend: BACKEND}}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterPage}
                    BinitialParams={{backend: BACKEND}}
                />
                <Stack.Screen
                    name="Liste des Contrats"
                    component={ScrollingContracts}
                    initialParams={{backend: BACKEND}}
                />
                <Stack.Screen
                    name="Profil"
                    component={ViewProfile}
                    initialParams={{backend: BACKEND}}
                />
                <Stack.Screen
                    name="Edition du Profil"
                    component={EditProfile}
                    initialParams={{backend: BACKEND}}
                />
                <Stack.Screen
                    name="Home"
                    component={HomePage}
                    initialParams={{backend: BACKEND}}
                    options={{headerBackVisible: false}}
                />
                <Stack.Screen
                    name="Liste des Propositions"
                    component={ListeProposition}
                    initialParams={{backend: BACKEND}}
                />
                <Stack.Screen
                    name="Création Proposition"
                    component={CreateProposition}
                    initialParams={{backend: BACKEND}}
                />
                <Stack.Screen
                    name="Création Contrat"
                    component={CreateContract}
                    initialParams={{backend: BACKEND}}

                />
                <Stack.Screen
                    name="Planning"
                    component={Planning}
                    initialParams={{backend: BACKEND}}

                />
                <Stack.Screen
                    name="Historique"
                    component={Historique}
                    initialParams={{backend: BACKEND}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const App = () => {
    return (
        <MyStack BACKEND={BACKEND}/>
    )
}

export default App
