const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/
const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const AuthService = {

    validatePassword(username, email, password) {
        if (password.length < 8) {
            return 'password must be at least 8 characters'
        }
        if (password.length > 72) {
            return 'password must be less than 72 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'password must not start or end with empty spaces'
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
            return 'password must contain one upper case, lower case, symbol, and number'
        }
        if (!emailValidator.test(email)) {
            return 'please use a valid email address'
        }
        if (password === username || password === email) {
            return 'username or email may not be used as password'
        }
        return null
    },
    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },
    createJwt(subject, payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            subject,
            algorithm: 'HS256',
        })
    },
    getUserWithUserName(db, username) {
        return db('recipro_users')
            .where({ username })
            .first()
    },
    verifyJwt(token) {
        return jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ['HS256'],
        })
    },
}

module.exports = AuthService
