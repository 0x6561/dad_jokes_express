var sqlite3 = require('sqlite3').verbose();

var _db;

function initDB(db_file_path = './dad_jokes.sqlite3'){
  if(_db){
    console.log(`Already Connected to ${db_file_path} SQlite database.\n`);
    return _db;
  }else{
    _db = new sqlite3.Database(db_file_path, (err) => {
      if (err) {
        console.log('woops\n');
        return console.error(err.message);
      }
      console.log(`Connected to ${db_file_path} SQlite database.\n`);
      return _db;
    })
  }
}

function close(){
    _db.close();
  }

module.exports = {
  initDB,
  close,
}
