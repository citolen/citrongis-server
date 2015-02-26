multer = require 'multer'
easyimage = require 'easyimage'
fs = require 'fs'

mul = multer { dest:"public/images" }
format = ['png', 'jpg', 'jpeg', 'gif', 'bmp']
img_resize_width = 200
img_resize_height = 200

ResizeImage = (req, res, next) ->
    return next?() if not req.files.picture
    file = req.files.picture
    if format.indexOf(file.extension) is -1
        fs.unlink file.path, (err) ->
            res.send 400, { code: 7, error: "Bad image format" } 
    else
        easyimage.resize
            src: file.path
            dest: file.path
            width: img_resize_width
            height: img_resize_height
        next?()

module.exports.file = mul
module.exports.image = [ mul, ResizeImage ]