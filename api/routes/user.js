import {Router} from "express";

const userRouter = Router();
import {checkAuth, FindAllSlug,FindOneById, FindAllAction, DelOneById} from "../controllers/userController";

const {isAuthenticated} = require("../config");

userRouter.get('/check-auth',checkAuth)
userRouter.post('/check-auth-by-slug',FindAllSlug)
userRouter.get('/find-one-by-id',FindOneById)
userRouter.get('/find-all-action',FindAllAction)
userRouter.post('/del-one-by-id',DelOneById)
export default userRouter;
