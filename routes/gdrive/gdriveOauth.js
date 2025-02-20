const express = require('express')
const { AuthGoggle, oauth2callback, getDataDrive } = require('../../controller/gdrive/gdriveOauthController')
const router = express.Router()

router.get('/auth', AuthGoggle)
router.get('/oauth2callback', oauth2callback)
router.get('/drive', getDataDrive)

module.exports = router