import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

// POST /api/login (public)
async function login(req, res) {
	 try {
		 const { email, name } = req.body || {};
		 if (!email || !name) {
			 return res.status(400).json({ message: 'name and email are required' });
		 }
		 const token = jwt.sign({ email, name }, process.env.JWT_SECRET, { expiresIn: '1h' });
		  return  res.status(200).cookie('accesstoken',token,{secure:false,httpOnly:true}).json({message:'login success and cookie passed'})
	 } catch (err) {
		 return res.status(500).json({ message: 'Login failed' });
	 }
}

// POST /api/users
async function createUser(req, res) {
	 try {
		 const { name, email } = req.body || {};
		 if (!name || !email) {
			 return res.status(400).json({ message: 'name and email are required' });
		 }
		 const user = await User.create({ name, email });
		 return res.status(201).json(user);
	 } catch (err) {
		 if (err?.name === 'SequelizeUniqueConstraintError') {
			 return res.status(409).json({ message: 'Email already exists' });
		 }
		 return res.status(500).json({ message: err });
	 }
}

// GET /api/users
async function getUsers(req, res) {
	 try {
		 const users = await User.findAll();
		 return res.status(200).json(users);
	 } catch (_err) {
		 return res.status(500).json({ message: 'Failed to fetch users' });
	 }
}

// GET /api/users/:id
async function getUserById(req, res) {
	 try {
		 const { id } = req.params;
		 const user = await User.findByPk(id);
		 if (!user) {
			 return res.status(404).json({ message: 'User not found' });
		 }
		 return res.status(200).json(user);
	 } catch (_err) {
		 return res.status(500).json({ message: 'Failed to fetch user' });
	 }
}

// PUT /api/users/:id
async function updateUser(req, res) {
	 try {
		 const { id } = req.params;
		 const { name, email } = req.body || {};
		 const user = await User.findByPk(id);
		 if (!user) {
			 return res.status(404).json({ message: 'User not found' });
		 }
		 if (name !== undefined) user.name = name;
		 if (email !== undefined) user.email = email;
		 await user.save();
		 return res.status(200).json(user);
	 } catch (err) {
		 if (err?.name === 'SequelizeUniqueConstraintError') {
			 return res.status(409).json({ message: 'Email already exists' });
		 }
		 return res.status(500).json({ message: 'Failed to update user' });
	 }
}

// DELETE /api/users/:id
async function deleteUser(req, res) {
	 try {
		 const { id } = req.params;
		 const user = await User.findByPk(id);
		 if (!user) {
			 return res.status(404).json({ message: 'User not found' });
		 }
		 await user.destroy();
		 return res.status(204).send();
	 } catch (_err) {
		 return res.status(500).json({ message: 'Failed to delete user' });
	 }
}

export {
	 login,
	 createUser,
	 getUsers,
	 getUserById,
	 updateUser,
	 deleteUser,
};
