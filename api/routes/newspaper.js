import {Router} from "express";
const newspaperRouter = Router();
import {FindNewspaper, CreateNewspaper,DeleteNewspaper,FindNewspaperById,EditNewspaperById} from "../controllers/newspaperController";

newspaperRouter.post('/create-newspaper',CreateNewspaper)
newspaperRouter.post('/find-newspaper',FindNewspaper)
newspaperRouter.get('/find-newspaper-by-id',FindNewspaperById)
newspaperRouter.post('/edit-newspaper',EditNewspaperById)
newspaperRouter.post('/dell-newspaper',DeleteNewspaper)
export default newspaperRouter;
