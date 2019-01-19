const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const UserApi = require('./routers/userApi');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/tk-hotgirls',
    { useNewUrlParser: true },
    (err) => {
    if(err) console.log(err)
    else console.log('DB success')
})

app.use('/api/users', UserApi);

app.listen(6699, (err) => {
    if(err) console.log(err);
    else console.log("Server: start success!");
})