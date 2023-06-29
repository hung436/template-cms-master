import {Router} from "express";
const cateRouter = Router();
import {CreateCate, FindCate, DeleteCate} from "../controllers/cateController";

cateRouter.post('/create-cate',CreateCate)
cateRouter.post('/find-cate',FindCate)
cateRouter.post('/dell-cate',DeleteCate)
export default cateRouter;
