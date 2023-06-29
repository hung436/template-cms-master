import { AxiosApiCMS } from '../axios';
import qs from "querystring";
const jwt = require("jsonwebtoken");
const config = require("../config");

const CreateNewspaper = (req, res, next) => {
  AxiosApiCMS.post('/cms/newspaper/create-newspaper', req.body).then((response) => {
    res.json(response.data)
  }).catch(err => {
    res.json({
      message: err,
      success: false
    })
  })
}
const FindNewspaper = (req, res, next) => {
  AxiosApiCMS.post('/cms/newspaper/find-newspaper', req.body).
    then((response) => {
      res.json(response.data)
    }).catch(err => {
      res.json({
        message: err,
        success: false
      })
    })
}
const EditNewspaperById = (req, res, next) => {
  AxiosApiCMS.post('/cms/newspaper/edit-newspaper',req.body).then((response) => {
    res.json(response.data)
  }).catch(err => {
    res.json({
      message: err,
      success: false
    })
  })
}
const FindNewspaperById = (req, res, next) => {
  AxiosApiCMS.get(`/cms/newspaper/find-one-by-id?id=${req.query.id}`).then((response) => {
    res.json(response.data)
  }).catch(err => {
    res.json({
      message: err,
      success: false
    })
  })
}
const DeleteNewspaper = (req, res, next) => {
  AxiosApiCMS.post('/cms/newspaper/delete-one-by-id', req.body).then((response) => {
    res.json(response.data)
  }).catch(err => {
    res.json({
      message: err,
      success: false
    })
  })
}
export {
  CreateNewspaper, FindNewspaper, DeleteNewspaper,EditNewspaperById,FindNewspaperById
}
