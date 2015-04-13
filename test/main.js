var
  should = require('should'),
  BlockedResource = require('..'),

  configPath = 'test/fixtures/config.json'
  ;

describe('impress-blocked-resource', function () {
  it('should work', function() {
    var
      manager = new BlockedResource(configPath);

    should(manager.resources.length).equal(2);
    should(manager.resources[1]).equal('resource-2');
  });
});