import { AxiosApiCMS } from '../axios';
import qs from "querystring";
const jwt = require("jsonwebtoken");
const config = require("../config");

const CreateResource = (req, res, next) => {
  AxiosApiCMS.post('/cms/resource/create-resource', req.body).then((response) => {
    res.json(response.data)
  }).catch(err => {
    res.json({
      message: err,
      success: false
    })
  })
}
const ResourceFindAll = (req, res, next) => {
  AxiosApiCMS.post('/cms/resource/find-all', req.body).then((response) => {
    res.json(response.data)
  }).catch(err => {
    console.log(err)
    res.json({
      message: err,
      success: false
    })
  })
}

const DeleteResource = (req, res, next) => {
  AxiosApiCMS.post('/cms/resource/delete-one-by-id', req.body).then((response) => {
    res.json(response.data)
  }).catch(err => {
    res.json({
      message: err,
      success: false
    })
  })
}
export {
  CreateResource, ResourceFindAll, DeleteResource
}
