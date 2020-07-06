const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require("./user.model");

class UsersService {
    constructor() {
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
                    return result;
                });
            }
            console.log('user not found');
            return false;
        })
    }

}
module.exports = UsersService;