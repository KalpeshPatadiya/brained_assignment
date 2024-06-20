const express = require('express')
const router = express.Router()

const upload = require('../config/multer')
const userController = require('../controllers/userController')

/**
 * apis
 */
router.get('/', userController.getUser)

router.post('/', upload.single('avatar'), userController.createUser)

router.put('/:id', upload.single('avatar'), userController.updateUser)

router.delete('/:id', userController.deleteUser)

module.exports = router;