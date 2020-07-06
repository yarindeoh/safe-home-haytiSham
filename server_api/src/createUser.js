const args = process.argv.slice(2);
if(!args ||args.length < 1){
    console.error('Please add 2 parameters 1. user name 2. password');
    process.exit();
}

const userName = args[0];
const password = args[1];

const UsersService = require("./api/authentication/users.service");
const usersService = new UsersService()

/* basic configuration */
const path = require('path');
let envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath});

/* DB connection */
const mongoose = require('mongoose');
const dbURI = process.env.DB_URI;
if (!dbURI) {
    console.error("No DB_URI in config file. Please check");
    process.exit();
}
const options = {
    autoIndex: false,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 1000, // Reconnect every 500ms
};
mongoose.Promise = global.Promise;
mongoose.connect(dbURI, options)
    .then(c => {
        console.log('Db is connected - will add the user');
        return usersService.createUser(userName, password).then(() =>{
            console.log('The user was created successfully');
            process.exit();
        }).catch(() =>{
            console.log('Error creating the user :(');
            process.exit();
        })      

    });
