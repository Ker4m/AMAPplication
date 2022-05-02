class CodeError extends Error {
    constructor(message, code) {
        super(message)
        this.code = code
        console.error(message)
    }
}

module.exports = CodeError
