
const path = require('path');
const crypto = require('crypto');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
});
const upload = multer({ storage })

module.exports = upload