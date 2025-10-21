import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const sequelize = new Sequelize('postgresql://postgres:abhinand@localhost:5432/usercreation');

async function initializeDatabaseConnection() {
	 try {
		 await sequelize.authenticate()
		 console.log("db connection success");
		 return 'db is running'
		 
	 } catch (error) {
		 // Surface connection errors early during startup
		 console.error('Unable to connect to the database:', error);
		 throw error;
	 }
}

export { sequelize, initializeDatabaseConnection };
