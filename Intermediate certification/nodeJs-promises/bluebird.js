var Promise = require('bluebird');
var MongoClient = Promise.promisifyAll(require('mongodb').MongoClient);

var url = 'mongodb://localhost:27017/example';

MongoClient.connectAsync(url).then(function (db) {
    console.log(db);
}).catch(function(err){
    //handle error
    console.log(err);
});