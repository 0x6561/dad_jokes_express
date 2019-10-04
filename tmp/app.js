console.log('Starting App...\n');

fs = require('fs');
os = require('os');

var user = os.userInfo();
var mod = require('./mod.js' );

console.log( `${mod.number}` );
console.log( user);

//console.log( module );
//fs.appendFile('tmp.txt', `\nhello ${user.username}!`, function(e){if(e){console.log('unable to write to file');}}) ;
