import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authMiddleware(req, res, next) {
	  try {
    let token;
    if (req.cookies?.accesstoken) {
      token = req.cookies.accesstoken;
    }else if (req.headers?.authorization &&req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.slice(7).trim();
    }
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export default authMiddleware;
