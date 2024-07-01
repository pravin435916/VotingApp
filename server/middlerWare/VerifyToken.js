import jwt from 'jsonwebtoken'
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    
    try {
      const decoded = jwt.verify(token, 'PRAV2004');
      req.userId = decoded.userId; // Correct assignment of userId to request object
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid Token' });
    }
  };
  export default verifyToken