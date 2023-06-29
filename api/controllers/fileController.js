var multer = require('multer')
const dirTree = require("directory-tree");
const sharp = require('sharp');
import axios from 'axios';
import FormData from 'form-data';
import path from 'path';
import { AxiosApiS3 } from '../axios';
import { to_slug } from '../../helpers/helpers'
const fs = require('fs');
var a = new Date(Date.now());
var year = a.getFullYear();
var month = a.getMonth();
var date = a.getDate();
var setRefix = date.toString() + parseInt(month + 1).toString() + year.toString();

var full_dir = process.env.FOLDER_UPLOAD + '/' + setRefix
console.log(full_dir)
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir(full_dir, (err) => {
            fs.chmod(full_dir, 0o777, (err) => {
                console.log('Permissions changed successfully');
                cb(null, full_dir)
            });
        });
    },
    filename: function (req, file, cb) {
        // var hashname = Date.now() + path.extname(file.originalname);
        // let file_name = Date.now() + '-' + file.originalname.replace(/(\s)/gm, `-`)
        // let mimetype = file_name.replace(/^.*\.(.*)$/gm, `$1`);
        // let nameReplace = to_slug(file_name).replace(mimetype,"");
        // cb(null, `${nameReplace}.${mimetype}`);
        cb(null, Date.now() + '-' + file.originalname);
        // var hashname = Date.now() + path.extname(file.originalname);
        // cb(null, hashname);
    }
})

var upload = multer({ storage: storage }).any();
module.exports.fileManager = function (req, res) {
    const tree = dirTree(process.env.FOLDER_UPLOAD, { attributes: ["size", "type", "extension"] });
    console.log(tree)
    return res.json(tree)
}
module.exports.enterFolder = function (req, res) {

    if (req.body.path) {
        const tree = dirTree(req.body.path, { attributes: ["size", "type", "extension"] });
        return res.status(200).json({
            message: "success",
            data: tree
        })
    } else {
        return res.status(404).json({
            message: "failer"
        })
    }
}
module.exports.delete = function (req, res) {
    let file = req.body.file
    console.log(file)
    if (fs.existsSync(file)) {
        fs.unlink(file, function (err) {
            if (err) {
                return res.status(404).json({
                    message: err
                });
            } else {
                return res.status(200).json({
                    message: 'success'
                })
            }
        });
    } else {
        return res.status(404).json({
            message: 'File not exits'
        })
    }
}

// Upload 
const uploadfile = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.status(404).json({
                message: err
            });
        }
        let resources = [];
        req.files.map((v, k) => {
            console.log(v)
            let obj = {};
            let fpath = v.destination + "/" + v.filename;
            obj.resource_type = v.mimetype.replace(/(\/.*)/gm, ``);
            obj.resource_name = v.filename;
            obj.resource_path = fpath.replace(/(..\/resources)/gm, ``);
            obj.resource_extension = v.mimetype;
            obj.news_art_type = req.body.news_art_type
            if (obj.resource_type == "image" && obj.news_art_type == "newspaper") {
                let newfile = v.destination + "/r_220_" + v.filename
                sharp(v.path)
                    .resize(220, 311) // Set the width and height
                    .toFile(newfile, (err, info) => {
                        if (err) throw err;
                        console.log(info);
                        fs.chmodSync(newfile, 0o777)
                    });
            }

            resources.push(obj);
            fs.chmodSync(v.path, 0o777)
        });

        return res.status(200).json({
            message: 'Upload file success',
            success: true,
            info: resources
        });
    })
}
const uplpadS3 = (req, res, next) => {
    axios.defaults.headers.common['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlcjEiLCJleHBpcmVzIjoxNjcxMTgwODM5LjY0NTQ0MTV9.Fy28rOfieiFFAE3S6sVLHhE_1bwy1-XizUwe6MisclE`;
    axios.get(`http://ec2-52-199-77-183.ap-northeast-1.compute.amazonaws.com/workflow/`).then((response) => {
        res.json(response.data)
    }).catch(err => {
        res.json({
            message: err,
            success: false
        })
    })
}
export {
    uplpadS3, uploadfile
}
