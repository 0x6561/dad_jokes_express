var express = require('express');
var router = express.Router();
var db = require('../Joke_db').initDB();

/* GET home page. */
router.get('/get_joke', function(req, res, next) {
  console.log(`in row.js`);
  console.log(req.body);
  //const sql = 'SELECT * FROM DAD_JOKES WHERE ID IN (SELECT ID FROM DAD_JOKES ORDER BY RANDOM() LIMIT 1)';
  let sql = 'SELECT * FROM DAD_JOKES WHERE ID = 99';
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
      "message":"success",
      "data":row
    })
  });
});

module.exports = router;
