const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const UserApi = require('./routers/userApi');
const PostApi = require('./routers/postApi');
const AuthApi = require('./routers/authApi');

const app = express();

app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/tk-hotgirls',
    { useNewUrlParser: true },
    (err) => {
    if(err) console.log(err)
    else console.log('DB success')
})

app.use('/api/users', UserApi);
app.use('/api/posts', PostApi)
app.use('/api/auth', AuthApi)

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/view/index.html')
})

app.listen(6699, (err) => {
    if(err) console.log(err);
    else console.log("Server: start success!");
})