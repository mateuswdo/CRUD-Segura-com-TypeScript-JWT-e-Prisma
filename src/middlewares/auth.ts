import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { SECRET_KEY } from "../controllers/signinController";

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Pegamos o token do cabeçalho http
  const token = request.headers["authorization"];

  // Caso nenhum cabeçalho tenha sido retornado então
  // mostra a mensagem "O token não foi fornecido"
  if (!token) {
    return response.status(401).json({ erro: "Unauthorized" });
  }

  try {
    // Decodificação do token
    const decoded = jwt.verify(token, SECRET_KEY) as User;
    // Armazena o ID do usuário autenticado em response.locals
    response.locals.userId = decoded.id;
    next();
  } catch (error) {
    // Se o token não for válido então retorna erro
    return response.status(401).json({ erro: "Unauthorized" });
  }
}
