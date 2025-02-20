const express = require('express')
const router = express.Router()
const { getDataGoogle, getListFolderGoogle, uploadToGoogle } = require('../../controller/gdrive/GDriveController')
const { uploadMemory } = require('../../middleware/UploadImageValidation')


router.get("/google/:folderId", getDataGoogle)
router.get("/google", getListFolderGoogle)
router.post("/google/upload", uploadMemory.single('image'), uploadToGoogle)

module.exports = router