const {google} = require('googleapis')
const mandatoryenv = require('mandatoryenv')

// Load Enviroment Variables to process.env (if not present take variables defined in .env file)
mandatoryenv.load(['GOOGLE_OAUTH_APP_GUID'])
mandatoryenv.load(['GOOGLE_OAUTH_APP_SECRET'])
mandatoryenv.load(['GOOGLE_OAUTH_APP_REDIRECT_URL'])
mandatoryenv.load(['PROTOCOL'])
mandatoryenv.load(['BACKEND_ENDPOINT'])
const {GOOGLE_OAUTH_APP_GUID} = process.env
const {GOOGLE_OAUTH_APP_SECRET} = process.env
const {GOOGLE_OAUTH_APP_REDIRECT_URL} = process.env
const {PROTOCOL} = process.env
const {BACKEND_ENDPOINT} = process.env

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_OAUTH_APP_GUID,
    GOOGLE_OAUTH_APP_SECRET,
    PROTOCOL + '://' + BACKEND_ENDPOINT + GOOGLE_OAUTH_APP_REDIRECT_URL
)

google.options({auth: oauth2Client})

module.exports = oauth2Client
