import { AxiosApiCMS } from '../axios';

import qs from "querystring";
const jwt = require("jsonwebtoken");
const config = require("../config");
const storage = require('node-sessionstorage')

const checkAuth = (req, res, next) => {
  res.json({
    data: 'tes success',
    success: true
  })
}
// 1. tìm tất cả chức danh
const FindAllSlug = (req, res, next) => {
  let { token } = req.body;
  if (token) {
    // storage.setItem('auth-token', token)
    // AxiosApiCMS.defaults.headers.common['Authorization'] = `Bearer ${storage.getItem('auth-token')}`;
    AxiosApiCMS.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    AxiosApiCMS.get('/cms/user/find-all-slug').then((response) => {
      console.log(response.data)
      if (response.data.status) {
        let info = jwt.decode(token, config.publickey)
        res.json({
          info: info,
          roles: response.data.data,
          success: true
        })
      }
    }).catch(err => {
      res.json({
        message: err,
        success: false
      })
    })
  } else {
    res.json({
      message: 'Chưa đăng nhập',
      success: false
    })
  }
}
// 2. tìm chức danh theo id 
const FindOneById = (req, res, next) => {

  AxiosApiCMS.get(`/cms/user/find-one-by-id?id=${id}`)
    .then((response) => {

    })
    .catch(err => {
      res.json({
        message: err,
        success: false
      })
    })
}
// 3. tìm tất cả các tác vụ 
const FindAllAction = (req, res, next) => {
  AxiosApiCMS.get('/cms/user/find-all-action')
    .then((response) => {

    })
    .catch(err => {
      res.json({
        message: err,
        success: false
      })
    })
}
// 4. xóa chức danh theo id - phương thức được gọi là POST
const DelOneById = (req, res, next) => {
  let { id } = req.body;
  AxiosApiCMS.post('/cms/user/delete-one-by-id', { id })
    .then((response) => {

    })
    .catch(err => {
      res.json({
        message: err,
        success: false
      })
    })
}

const checkProfile = ({ req, res, next }, auth) => {
  let user = auth.data;
  AxiosApiCMS.post('/competition-history/profile/is-profile', qs.stringify({ member_id: user.uuid }))
    .then(({ data: profile }) => {
      res.json({
        auth: {
          ...auth,
          token: jwt.sign({
            id: user['uuid'],
            email: user.email,
            full_name: user.full_name
          }, config.authSecret, { expiresIn: '7d' }) // generate JWT token here
        },
        profile: profile
      })
    }).catch(err => {
      console.log(err)
      res.json({
        message: 'Có lỗi trong quá trình xác thực',
        success: false
      })
    })
}
export {
  checkAuth, checkProfile, FindAllSlug, FindOneById, FindAllAction, DelOneById
}
