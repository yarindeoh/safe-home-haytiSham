const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const User = require("./user.model");

class UsersService {
    constructor() {
        this.jwtExpiresInValue = 12 * 60 * 60, // 12 hours;
        this.jwtSubjectValue = 'login';    
    }

    createUser(userName, userPaswword){
        return bcrypt.hash(userPaswword, saltRounds).then((hash) => {
            return User.create({name: userName, password_hash: hash});
        });
    }

    validateLogIn(userName, userPaswword){
        return User.findOne({name:userName}).then((user) =>{
            if(user && user.password_hash){
                return bcrypt.compare(userPaswword, user.password_hash).then(function(result) {
                    console.log('user password validation '+ result);
                    if(result){
                        return user;
                    }
                    return false;
                });
            }
            console.log('user not found');
            return false;
        })
    }

    generateJWTToken(userId, userName) {
        const jwtSsecret = process.env.JWT_SECRET || '';
        const options = { expiresIn: this.jwtExpiresInValue, subject:  this.jwtSubjectValue}
        return jwt.sign({ id: userId, name: userName }, jwtSsecret, options);
    };

    validateJWTToken(token) {
        try {
            const jwtSsecret = process.env.JWT_SECRET || '';
            var decoded = jwt.verify(token, jwtSsecret);
            if(!decoded || decoded == null || !decoded.id || decoded.id == null){
                return false;
            }
            return User.findById(decoded.id).then((user) => {
                if (user?._id) {
                    return true;
                }
                return false;
            });
        } catch (err) {
            return false;
        }
    }
    

}
module.exports = UsersService;