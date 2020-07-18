const { signUp } = require('../service/firebaseService');
var express = require('express');
var router = express.Router();

router.post('/signup', async function(req, res, next) {
  await signUp(req.body.firstName, req.body.lastName, req.body.uuid)
  res.send('Signed up');
});


module.exports = router;
