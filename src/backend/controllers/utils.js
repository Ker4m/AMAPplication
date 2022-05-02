const status = require('http-status')
const CodeError = require('../utils/CodeError.js')

module.exports = {
    // eslint-disable-next-line no-unused-vars
    async notYetImplemented() {
        // #swagger.ignore = true
        throw new CodeError('Not yet implemented', status.HTTP_STATUS_NOT_IMPLEMENTED)
    },
    async methodNotAllowed() {
        // #swagger.tags = ['Method Not Allowed']
        // #swagger.ignore = true
        throw new CodeError('Method not allowed', status.METHOD_NOT_ALLOWED)
    }
}
