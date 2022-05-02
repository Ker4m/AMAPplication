import {authorize} from 'react-native-app-auth'
import axios from 'axios'
import {BACKEND} from './config'

const GOOGLE_OAUTH_APP_GUID = '609780781141-u7quqq1f77ki1tlihivplch4jei319br'

const oauthConfig = {
    issuer: 'https://accounts.google.com',
    clientId: `${GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
    redirectUrl: `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/google`,
    scopes: ['https://www.googleapis.com/auth/userinfo.email']
}

async function oauth2Login() {
    const authState = await authorize(oauthConfig)
    const {
        accessToken,
        accessTokenExpirationDate,
        idToken,
        refreshToken
    } = authState
    const userData = await axios.post(`${BACKEND}/login`, {}, {
        headers: {'x-access-token': idToken}
    })
    if (userData.status !== 200) throw new Error()
    return {...userData.data.data, accessToken, accessTokenExpirationDate, idToken, refreshToken}
}


export default oauth2Login
