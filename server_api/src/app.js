const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');


console.log("Starting server...");

const app = express();

/* requests logger */
app.use(morgan('tiny'));

/* config middlewares */
app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

/* security headers */
app.use(function applyHeaders(req, res, next) {
    res.set('X-Frame-Options', 'DENY');
    res.set('Content-Security-Policy', "frame-ancestors 'none';");
    next();
});

/* api router */
const routes = require("./api/api.routes");
app.use('/api', routes);

/* basic configuration */
let envPath = path.join(__dirname, '../.env');
const args = process.argv.slice(2);
if(args && args[0] == 'dev'){
    envPath = path.join(__dirname, '../.env-development');
}
require('dotenv').config({ path: envPath});

/* static files */
const staticPath = path.join(__dirname, '../../build');
console.log("Static files from folder " + staticPath);
app.use(express.static(staticPath));

app.get('/*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

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
    useFindAndModify:false,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 1000, // Reconnect every 500ms
  };
  mongoose.Promise = global.Promise;
  mongoose.connect(dbURI, options)
      .then(c => console.log('Db is connected'));


/* listen on port */
const port = process.env.PORT || 5000;
const env = process.env.ENV || '';
app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
// app.listen(port, () => console.log(`Listening on port ${port} configuration  ${env}`));