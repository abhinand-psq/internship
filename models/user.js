import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
	 id: {
		 type: DataTypes.INTEGER,
		 autoIncrement: true,
		 primaryKey: true,
	 },
	 name: {
		 type: DataTypes.STRING,
		 allowNull: false,
	 },
	 email: {
		 type: DataTypes.STRING,
		 allowNull: false,
		 unique: true,
		 validate: {
			 isEmail: true,
		 },
	 },
	 password: {
		 type: DataTypes.STRING,
		 allowNull: false,
	 },
},  {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',   // map Sequelize createdAt to your column
  updatedAt: 'updated_at',   // map Sequelize updatedAt to your column
});

export default User;
