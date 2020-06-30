/**
 * module dependencies
 */
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

/**
 * User Schema
 */
const UserSchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    username: {
        type: String,
        default: '',
    },
    email: {
        type: String, // 唯一值
        default: '',
    },
    hashed_password: {
        type: String,
        default: '',
    },
    salt: {
        type: String,
        default: '',
    },
    phone: {
        type: Number,
        max: 11,
    },
    address: {
        type: String,
        default: '',
    },
    sex: {
        type: Number,
        default: 1, // 1 男， 2 女
    },
});

/**
 * Virtuals
 */
UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

/**
 * UserSchema Methods
 */
UserSchema.methods = {
    /**
     * Make salt
     * @return {String}
     */
    makeSalt() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    },
    /**
     * 加密密码
     * @return {String}
     */
    encryptPassword(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
    /**
     * 验证密码是否一样
     * @param {String} plainText
     * @return {String}
     */
    authenticate(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
};

mongoose.model('User', UserSchema);
