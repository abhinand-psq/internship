import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

async function initializeDatabaseConnection() {
	 try {
		 await sequelize.authenticate()
		 console.log("db connection success");
		 return 'db is running'
		 
	 } catch (error) {
		 
		 console.error('Unable to connect to the database:', error);
		 throw error;
	 }
}

export { sequelize, initializeDatabaseConnection };
