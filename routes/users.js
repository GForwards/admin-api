const express = require('express');
const router = express.Router();
const usersApi = require('../api/user.js');

/* 添加用户 */
router.post('/add', usersApi.create);

module.exports = router;
