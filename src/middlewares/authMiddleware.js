import { verifyToken } from '../utils/jwtUtils.js';

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ messagem: "Token não fornecido" })
  }

  try {
    // Verifica o token
    const decoded = verifyToken(token)
    req.user = decoded  // Adiciona os dados do usuário à requisição
    next()
  } catch (error) {
    res.status(401).json({ mensagem: 'Token inválido' });
  }
}

