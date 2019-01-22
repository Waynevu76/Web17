const express = require('express');
const bcrypt = require('bcryptjs');
const UserApi = express.Router();

const UserModel = require('../models/userModel');

//Middleware
UserApi.use((req, res, next) => {
	console.log("Middleware");
	req.user = "username1";
	next();
});

// CRUD - Create, Read, Update, Delete

// Read all users http://localhost:6699/api/users?page=1&per_page=5
UserApi.get('/', (req, res) => {
	const { page=1, per_page=5 } = req.query;
	// const perPage = 5;
	UserModel.find({})
		.select('-password -__v')
		.skip((page-1)*per_page)
		.limit(per_page*1)
		.then((users) => {
			res.send({ data: users });
		})
		.catch((error) => {
			res.send({ error });
		});
});

// Read user by id
UserApi.get('/:userId', (req, res) => {
	const { userId } = req.params;
	UserModel.findById(userId)
		.select('-password -__v')
		.then((userFound) => {
			res.send({ data: userFound });
		})
		.catch((error) => {
			res.send({ error });
		});
});

// Create user
UserApi.post('/', (req, res) => {
	const { username, password, avatar } = req.body;
	// const salt = bcrypt.genSaltSync(12);
	// const hashPassword = bcrypt.hashSync(password, salt);
	const newUsers = {
		username,
		password,
		avatar
	};
	UserModel.init()
		.then(() => {
			return UserModel.create(newUsers);
		})
		.then((userCreated) => {
			res.send({ data: userCreated });
		})
		.catch((error) => {
			res.send({ error });
		});
});

// Update user
UserApi.put('/:userId', (req, res) => {
	const { userId } = req.params;
	const { password, avatar } = req.body;
	UserModel.findById(userId)
		.then((userFound) => {
			if(!userFound) res.send({ error: "User not exist!" })
			else {
				if(password) userFound.password = password;
				if(avatar) userFound.avatar = avatar;
				return userFound.save();
			}
		})
		.then((userUpdated) => {
			res.send({ data: userUpdated });
		})
		.catch((error) => {
			res.send({ error });
		});
});

// Delete user
UserApi.delete('/:userId', (req, res) => {
	const { userId } = req.params;
	UserModel.findByIdAndRemove(userId)
		.then(() => {
			res.send({ data: "success" });
		})
		.catch((error) => {
			res.send({ error });
		});
});

module.exports = UserApi;