var express = require('express');
var router = express.Router();

/* GET users listing. */
// eslint-disable-next-line no-unused-vars
router.get('/', function (req, res, next) {
    res.json({ name: 'yangyankang', age: 17 });
});

module.exports = router;
