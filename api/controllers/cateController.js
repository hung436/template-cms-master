import { AxiosApiCMS } from '../axios';

const CreateCate = (req, res, next) => {
    AxiosApiCMS.post('/cms/category/create-category',req.body).then((response) => {
      res.json(response.data)
    }).catch(err => {
      res.json({
        message: err,
        success: false
      })
    })
}
const FindCate = (req, res, next) => {
  console.log(req.body)
  AxiosApiCMS.post('/cms/category/find-all',req.body).then((response) => {
    res.json(response.data)
  }).catch(err => {
    res.json({
      message: err,
      success: false
    })
  })
}
const DeleteCate= (req, res, next) => {
  AxiosApiCMS.post('cms/category/delete-one-by-id',req.body).then((response) => {
    res.json(response.data)
  }).catch(err => {
    res.json({
      message: err,
      success: false
    })
  })
}
export {
  CreateCate,FindCate,DeleteCate
}
