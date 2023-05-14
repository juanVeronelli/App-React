const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: function (req, file, cb) {
        cb(null, `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage })
module.exports = {
    upload
}