import { Request, Response } from "express";
import prisma from "../../prisma/db";

export class PostController {
  public async index(request: Request, response: Response) {
    const userId = response.locals.userId;

    if (!userId) {
      return response.status(401).json({ erro: "Unauthorized" });
    }
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });

    return response.status(200).json(posts);
  }
  public async store(request: Request, response: Response) {
    const userId = response.locals.userId;

    const { title } = request.body;

    const post = await prisma.post.create({
      data: {
        title: title,
        authorId: userId,
      },
    });

    return response.status(200).json(post);
  }
}
