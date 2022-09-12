const User = require('../models/user');

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

// Create User
const createUser = async (req, res) => {
  try {
    await User.insertMany(req.body);

    res.status(201).json({ msg: 'User Created' });
  } catch (error) {
    console.log(error);
  }
};

// Get User BY ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (!user) return res.status(404).json({ msg: 'User Not Found' });

    res.status(302).json(user);
  } catch (error) {
    console.log(error);
  }
};

// Update USer
const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (!user) return res.status(404).json({ msg: 'User Not Found' });

    await User.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          nama: req.body.nama,
          email: req.body.email,
          nohp: req.body.nohp,
        },
      }
    );
    if (!user) return res.status(404).json({ msg: 'User Not Found' });

    res.status(200).json({ msg: 'User Updated!' });
  } catch (error) {
    console.log(error);
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    });
    if (!user) return res.status(404).json({ msg: 'User Not Found' });

    await User.deleteOne({
      _id: req.params.id,
    });

    res.status(200).json({ msg: 'User Deleted!' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };
