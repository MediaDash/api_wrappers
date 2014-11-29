var hippie = require('hippie');
var server = require('../server');

// Read more about hippie : https://www.npmjs.org/package/hippie
describe('Server', function () {
  describe('/twitter endpoint', function () {
    it('returns tweets based on the term', function (done) {
      hippie(server)
        .json()
        .get('/twitter?term=dbc')
        .expectStatus(200)
        .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
    });
  });
});
