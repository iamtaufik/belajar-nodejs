const express = require('express');
const { getUsers, createUser, getUserById, updateUser, deleteUser } = require('../controllers/userControllers');

const route = express.Router();

route.get('/', getUsers);
route.get('/:id', getUserById);
route.post('/', createUser);
route.put('/:id', updateUser);
route.delete('/:id', deleteUser);

module.exports = route;
