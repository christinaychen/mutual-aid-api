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

router.post('/:uuid/creator/:requestUuid', async function(req, res) {
  var db = await getDb()
  var owns = []
  userUuid = req.params.uuid
  await db.ref("user-request/"+userUuid+"/owns").once('value').then(function(snapshot) {
    if(snapshot.val()!=null) {
      console.log(snapshot.val())
      owns = snapshot.val()
    }
  })
  requestUuid=req.params.requestUuid
  owns.push(requestUuid);
  console.log(owns)
  db.ref("user-request/"+userUuid).set({
    owns: owns
  })
  res.send("Relationship created")
})

router.get('/requests/:userUuid', async function(req, res) {
  var db = await getDb()
  var userUuid = req.params.userUuid;
  var requestsOwns = [];
  db.ref("user-request/"+userUuid+"/owns").once('value').then(function(snapshot) {
    requestOwns=snapshot.val()
  })
  ret = {}
  db.ref("requests/financial").once('value').then(function(snapshot) {
    snapshot.forEach((child) => {
      key = child.key
      if (requestOwns.includes(child.key)) {
        console.log("here")
        ret[key]=child.val()
        console.log(ret)

      }
    });

    return res.json(ret)
})
})

module.exports = router;
