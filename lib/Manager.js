const
  DEFAULTS_CONFIG_PATH = 'config/defaults.json';

var
  fs = require('fs');

module.exports = Manager;

function Manager(options) {
  this.resources = [];
  this.setOptions(options);
}

Manager.prototype = {

  setOptions: function(options) {
    if (typeof options == 'string') {
      this.addConfig(options);
    }
    else if (Array.isArray(options)) {
      this.add(options);
    }
    else if (options && typeof options == 'object') {
      if (options.defaults) {
        this.addDefaults();
      }
      if (options.configs) {
        this.addConfig(options.configs);
      }
      if (options.config) {
        this.addConfig(options.config);
      }
      if (options.resources) {
        this.add(options.resources);
      }
    }
  },

  add: function(list) {
    if (!Array.isArray(list)) {
      list = [list];
    }
    Array.prototype.push.apply(
      this.resources,
      list.filter(function(resource) {
        return resource
      })
    );
  },

  addConfig: function(configs) {
    var
      index;
    if (!Array.isArray(configs)) {
      configs = [configs];
    }

    for (index = 0; index < configs.length; index++) {
      this.add(
        JSON.parse(fs.readFileSync(configs[index]))
      )
    }
  },

  addDefaults: function() {
    this.addConfig(DEFAULTS_CONFIG_PATH);
  },

  getResources: function() {
    return this.resources;
  }

};