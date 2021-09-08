var express = require('express');
var router = express.Router();

const { kakaoController } = require('../controllers');

router.post('/accessToken', kakaoController.accessToken.post)

module.exports = router;