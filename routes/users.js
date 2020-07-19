const { signUp, getUserFirstName } = require('../service/firebaseService');
const { getDb } = require('../service/firebaseService');
var express = require('express');
var router = express.Router();


router.post('/signup', async function(req, res, next) {
  await signUp(req.body.firstName, req.body.lastName, req.body.uuid)
  res.send('Signed up');
});

router.get('/name/:uuid', async function(req, res) {
  var db = await getDb()
  db.ref("users/"+req.params.uuid).once('value').then(function(snapshot) {
    return res.json(snapshot.val());
  })
})
module.exports = router;
