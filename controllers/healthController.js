import { initializeDatabaseConnection, sequelize } from '../config/db.js';

// GET /health - Simple health check
export async function getHealthStatus(req, res) {
	 try {
		 await sequelize.authenticate()
		 await sequelize.sync({ alter: true });
		 console.log("running goodly")
		 res.status(200).json({
			 status: 'healthy',
			 message: 'API is running and database is connected',
			 timestamp: new Date().toISOString()
		 });
	 } catch (error) {
		 res.status(503).json({
			 status: 'unhealthy',
			 message: 'API is running but database connection failed',
			 error: error.message,
			 timestamp: new Date().toISOString()
		 });
	 }
}

