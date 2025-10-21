import dotenv from 'dotenv';
import mainapp from './index.js'
import { initializeDatabaseConnection } from './config/db.js';
dotenv.config();

const port =process.env.PORT || 3000;

	initializeDatabaseConnection().then((res)=>{
	   mainapp.listen(port,(res)=>{
		if(res){
			console.log("oops connection error");
			process.exit(1)
		}
		console.log(`Server listening on port ${port}`);
	   })	
	}).catch((err)=>{
		console.log(err);
	})