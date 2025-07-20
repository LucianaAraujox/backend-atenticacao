// Verificar Tokens

// src/middlewares.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded); // ✅ Para debug
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token inválido ou expirado' });
  }
};

module.exports = authMiddleware;

