var Promise = require('promise');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/example';

MongoClient.connect(url)
    .then(function(db) {
    console.log(db);
}).catch(function(err){
    //handle error
    console.log(err);
});