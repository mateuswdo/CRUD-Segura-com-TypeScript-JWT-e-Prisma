import { Router } from "express";
import { PostController } from "../controllers/postsController";
import { registerController } from "../controllers/registerController";
import { signinController } from "../controllers/signinController";
import { authMiddleware } from "../middlewares/auth";

const routes = Router();
const postController = new PostController();
// Tudo que estiver aqui dentro será nossas rotas
// Auth
routes.post("/register", registerController);
routes.post("/signin", signinController);

// CRUD
routes.post("/posts", authMiddleware, postController.store);
routes.get("/posts", authMiddleware, postController.index);
export { routes };
