var app     = require('../index.js');
var request = require('supertest')(app);

describe('/home api', function() {
  it('should return hello world', function(done) {
    request
      .get('/')
      .expect('Hello world\n', done);
  });
});

describe('/info api', function() {
  it ('should return json', function(done) {
   request
     .get('/info')
     .expect({}, done);
  });
});
