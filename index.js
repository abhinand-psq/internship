import express from 'express';
import cookie from 'cookie-parser'
import dotenv from 'dotenv';
dotenv.config()
import userRoutes from './routes/userRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
const app = express();
app.use(express.json());
app.use(cookie())
// app.use((req,res,next)=>{
// 	console.log('middleware works');
//     next()
// })
// app.get('/hello', (req, res) => {
// 	res.json({ message: 'Hello World! Server is working!' });
// });
app.use((req,res,next)=>{
    console.log("new git");
    next()
})
app.use('/', healthRoutes);
app.use('/api', userRoutes);

export default app


