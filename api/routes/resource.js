import {Router} from "express";
const resourceRouter = Router();
import {CreateResource,ResourceFindAll , DeleteResource} from "../controllers/resourceController";

resourceRouter.post('/res-create',CreateResource)
resourceRouter.post('/res-find-all',ResourceFindAll)
resourceRouter.post('/res-dell',DeleteResource)
export default resourceRouter;
