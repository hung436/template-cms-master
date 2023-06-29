import {AxiosApiCMS} from "./axios";
import userRouter from "./routes/user";
import articleRouter from "./routes/article";
import resourceRouter from "./routes/resource";
import newspaperRouter from "./routes/newspaper";
import cateRouter from "./routes/cate";
import files from "./routes/files";
const storage = require('node-sessionstorage')
const logger = require('morgan')
const express = require('express')
var cookieParser = require('cookie-parser');
const app = express()
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(logger('dev'))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser())

// Require & Import API routes

// Use API Routes
app.use(userRouter)
app.use(articleRouter)
app.use(newspaperRouter)
app.use(resourceRouter)
app.use(cateRouter)
app.use(files)

// Export the server middleware
module.exports = {
  path: '/api/',
  handler: app
}
