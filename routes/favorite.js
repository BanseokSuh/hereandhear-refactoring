var express = require('express');
var router = express.Router();

const { favoriteController } = require('../controllers');

router.post('/addOrDelete', favoriteController.addOrDelete.post);
router.get('/list/:id', favoriteController.list.get);

module.exports = router;