const multer = require('multer');
const path = require('path');

const constants = require('../constants/constants')
const extensions = constants.extensions;
const common = constants.common;
const routes = constants.routes;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const ext = path.extname(file.originalname)
      if (ext === extensions.PNG || 
          ext === extensions.JPG || 
          ext === extensions.JPEG) {
            cb(null, path.join(common.PUBLIC,routes.IMAGE_FILE))
      }
      else if (ext === extensions.MD) (
        cb(null, path.join(common.PUBLIC,routes.BLOG_FILE))
      )
    },
    filename: function (req, file, cb) {
      const uuid = Date.now()
      const sfx = path.extname(file.originalname)
      const base = path.basename(file.originalname,sfx)
      cb(null, base + '-' + uuid + '-' + file.fieldname + sfx)
    }
  })
  
const upload = multer({ storage: storage })

module.exports = upload;