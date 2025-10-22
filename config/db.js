
import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database:process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  port: 5432,
  clientMinMessages: 'notice',	
});

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
