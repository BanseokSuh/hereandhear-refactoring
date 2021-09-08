var express = require('express');
var router = express.Router();

const { contentsController } = require('../controllers');

router.post('/category', contentsController.category.post);
router.post('/recommend', contentsController.recommend.post);
router.get('/:id', contentsController.detail.get);

module.exports = router;