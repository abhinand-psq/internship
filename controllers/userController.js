import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/user.js';
import { sequelize } from '../config/db.js';

dotenv.config();

// POST /api/login (public)
async function login(req, res) {
	 try {
		 const { email, name, password } = req.body || {};
		 if (!email || !name || !password) {
			 return res.status(400).json({ message: 'name, email and password are required' });
		 }
		 
		 const user = await User.findOne({ where: { email, name } });
		 if (!user) {
			 return res.status(404).json({ message: 'No such user' });
		 }
		 
		
		 const isPasswordValid = await bcrypt.compare(password, user.password);
		 if (!isPasswordValid) {
			 return res.status(401).json({ message: 'Password incorrect' });
		 }
		 
		 const token = jwt.sign({ email, name, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
		 return res.status(200).cookie('accesstoken', token, { secure: false, httpOnly: true }).json({ message: 'Login success and cookie passed' });
	 } catch (err) {
		 return res.status(500).json({ message: 'Login failed' });
	 }
}

// POST /api/users
async function createUser(req, res) {
	await sequelize.sync({ alter: true });
	 try {
		 const { name, email, password } = req.body || {};
		 console.log(name,email,password);
		 
		 
		 if (!name || !email || !password) {
			 return res.status(400).json({ message: 'name, email and password are required' });
		 }
		 
		 
		 
		 const existingUser = await User.findOne({ where: { email:email } });
		 if (existingUser) {
			 return res.status(409).json({ message: 'User already exists' });
		 }
		 console.log("reached here");
	
		 const saltRounds = 10;
		 const hashedPassword = await bcrypt.hash(password, saltRounds);
		 
		 const user = await User.create({ name, email, password: hashedPassword });
		 return res.status(201).json({ 
			 id: user.id, 
			 name: user.name, 
			 email: user.email,
			 message: 'User created successfully' 
		 });
	 } catch (err) {
		 if (err?.name === 'SequelizeUniqueConstraintError') {
			 return res.status(409).json({ message: 'Email already exists' });
		 }
		 return res.status(500).json({ message: err.message });
	 }
}

// GET /api/users
async function getUsers(req, res) {
	 try {
		 const users = await User.findAll({
			 attributes: { exclude: ['password'] } 
		 });
		 return res.status(201).json(users);
	 } catch (_err) {
		 return res.status(500).json({ message: 'Failed to fetch users' });
	 }
}

// GET /api/users/:id
async function getUserById(req, res) {
	 try {
		 const { id } = req.params;
		 const user = await User.findByPk(id, {
			 attributes: { exclude: ['password'] } 
		 });
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
		 
		
		 const userResponse = {
			 id: user.id,
			 name: user.name,
			 email: user.email,
			 createdAt: user.createdAt,
			 updatedAt: user.updatedAt
		 };
		 return res.status(200).json(userResponse);
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
			 return res.status(404).json({ message: 'User not found 0' });
		 }
		 await user.destroy();
		 return res.status(200).json({message:`user deleted successfully`});
	 } catch (err) {
		 return res.status(500).json({ message: `Failed to delete user ${err}` });
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
