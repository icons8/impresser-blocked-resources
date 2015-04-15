var
  should = require('should'),
  BlockedResource = require('..'),

  configPath = 'test/fixtures/config.json'
  ;

describe('impress-blocked-resource', function () {
  it('should work', function() {
    var
      manager = new BlockedResource({ defaults: false, config: configPath });

    should(manager.resources.length).equal(2);
    should(manager.resources[1]).equal('resource-2');
  });

  it('should defaults work', function() {
    var
      manager = new BlockedResource();

    should(manager.resources.length).greaterThan(0);
    should(manager.resources).containDeep(['fonts.googleapis.com']);
  });

  it('should work optional flag', function(done) {
    var
      manager = new BlockedResource();

    try {
      manager.addConfig('file_not_exists', true);
    }
    catch(e) {
      done(e);
      return;
    }

    try {
      manager.addConfig('file_not_exists');
    }
    catch(e) {
      should(e).not.empty;
      done();
      return;
    }
    done('error');
  });
});