var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login-info', function(req, res, nest){
  console.log('/login-info endpoint hit')
  console.log(req)
  res.send('howdy partner')
})

module.exports = router;
