const config = require('../config')
const { Router } = require('express')

const router = Router()

import {uplpadS3, uploadfile} from "../controllers/fileController";

// Initialize Controller
// const filesController = require('../controllers/fileController')
router.post('/upload', uploadfile)
router.get('/upload-s3', uplpadS3)
module.exports = router
