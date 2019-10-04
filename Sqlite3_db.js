var sqlite3 = require('sqlite3').verbose();

class Sqlite3_db {

constructor(db_file_path = './dad_jokes.sqlite3'){
this.db = new sqlite3.Database(db_file_path, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the dad-jokes SQlite database.');
})
}

close(){
  this.db.close();
}

 test() {
  console.log('test test');
}
}

module.exports = Sqlite3_db; 
