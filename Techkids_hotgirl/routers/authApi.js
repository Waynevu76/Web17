const express = require('express');
const bcrypt = require('bcryptjs');
const AuthApi = express.Router();

const UserModel = require('../models/userModel');

AuthApi.post('/login', (req, res) => {
	const { username, password } = req.body;
	UserModel.findOne({ username })
		.then(userFound => {
			if(!userFound) res.send("User not exist!");
			else {
				if (bcrypt.compareSync(password, userFound.password)) {
					res.send("Login success");
				} else res.send("Wrong password!");
			}
		})
		.catch(error => res.send(error));
});

module.exports = AuthApi;