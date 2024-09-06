import { Request, Response } from "express";
import prisma from "../../prisma/db";
import bcrypt from "bcryptjs";

export async function registerController(request: Request, response: Response) {
  const { name, email, password } = request.body;

  // Verificar se o usuário já existe
  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  // Se o usuário exister retorna um erro
  if (userExists) {
    return response.json({ erro: "Usuário já existe" });
  }

  // Criptografando a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criando o usuário no banco de dados
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  // retornando o usuário criado

  return response.json(user);
}
