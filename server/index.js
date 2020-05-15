const express = require('express');
const path = require("path");

const port = 8080;
const app = express();

app.listen(port);
// Serve index.html and redirect all requests to / in order to handle routes
// internally by react routers
app.use('/', express.static('dist'));
app.get('*', (req, res) => {
   res.sendFile(path.resolve('dist/index.html'));
});

