import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();


const sequelize = new Sequelize(process.env.DATABASE_URL,{
  dialect: 'postgres',
  protocol: 'postgres',
  logging: console.log, // optional: logs SQL queries
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // needed for Supabase
    },
  },
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
