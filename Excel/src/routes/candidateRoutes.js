const express = require('express');
const candidateController = require('../controllers/candidateController');
const router = express.Router();

router.get('/upload', candidateController.getUploadPage);

module.exports = router;
