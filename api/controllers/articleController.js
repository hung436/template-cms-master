import { AxiosApiCMS } from "../axios";
import qs from "querystring";
const jwt = require("jsonwebtoken");
const config = require("../config");

const CreateArticle = (req, res, next) => {
  AxiosApiCMS.post("/cms/article/create-article", req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.json({
        message: err,
        success: false,
      });
    });
};
const FindArticle = (req, res, next) => {
  AxiosApiCMS.post("/cms/article/find-article", req.body)
    .then((response) => {
      console.log(response);
      res.json(response.data);
    })
    .catch((err) => {
      res.json({
        message: err,
        success: false,
      });
    });
};
const EditArticleById = (req, res, next) => {
  AxiosApiCMS.post("/cms/article/edit-article", req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.json({
        message: err,
        success: false,
      });
    });
};
const FindArticleById = (req, res, next) => {
  AxiosApiCMS.get(`/cms/article/find-one-by-id?id=${req.query.id}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.json({
        message: err,
        success: false,
      });
    });
};
const DeleteArticle = (req, res, next) => {
  AxiosApiCMS.post("cms/article/delete-one-by-id", req.body)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      res.json({
        message: err,
        success: false,
      });
    });
};
export {
  CreateArticle,
  FindArticle,
  DeleteArticle,
  FindArticleById,
  EditArticleById,
};
