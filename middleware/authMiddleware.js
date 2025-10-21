import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authMiddleware(req, res, next) {
	 const authHeader =req.cookies?.accesstoken || req.headers?.['authorization'] ;
	//  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
	 if (!authHeader) {
		 return res.status(401).json({ message: 'Authorization token missing' });
	 }
	 try {
		 const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
		 req.user = decoded;
		 return next();
	 } catch (err) {
		 return res.status(401).json({ message: 'Invalid or expired token' });
	 }
}

export default authMiddleware;
