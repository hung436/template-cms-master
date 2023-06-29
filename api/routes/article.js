import {Router} from "express";
const articleRouter = Router();
import {CreateArticle, FindArticle, DeleteArticle,FindArticleById,EditArticleById} from "../controllers/articleController";

articleRouter.post('/create-article',CreateArticle)
articleRouter.post('/find-article',FindArticle)
articleRouter.get('/find-article-by-id',FindArticleById)
articleRouter.post('/edit-article',EditArticleById)
articleRouter.post('/dell-article',DeleteArticle)
export default articleRouter;
