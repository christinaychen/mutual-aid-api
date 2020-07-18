const express = require('express');
var router = express.Router();

router.get('', (err, res) => {
  res.status(200);
  res.send("Mutual Aid Site API")
  res.end();
})

module.exports = router