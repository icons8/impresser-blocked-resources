const
  DEFAULTS_CONFIG_FILENAME = 'config/blocked-resources.json';

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
      options = {};
    }
    else if (Array.isArray(options)) {
      this.add(options);
      options = {};
    }
    else if (options && typeof options == 'object') {
      if (options.config) {
        this.addConfig(options.config, options.optional || false);
      }
      if (options.resources) {
        this.add(options.resources);
      }
    }
    else {
      options = {};
    }
    if (options.defaults || typeof options.defaults == 'undefined') {
      this.addDefaults();
    }
  },

  add: function(/* ...lists */) {
    var
      resources = this.resources;

    Array.prototype.slice.apply(arguments).forEach(perform);

    function perform(list) {
      if (!Array.isArray(list)) {
        list = [list];
      }
      Array.prototype.push.apply(
        resources,
        list.filter(function(resource) {
          return resource
        })
      );
    }
    return this;
  },

  addConfig: function(/* ...configs */) {
    var
      self = this,
      optional = false,
      args;

    args = Array.prototype.slice.apply(arguments);
    if (typeof args[args.length - 1] == 'boolean') {
      optional = args.pop();
    }

    args.forEach(perform);

    function perform(config) {
      var
        index;
      if (!Array.isArray(config)) {
        config = [config];
      }

      for (index = 0; index < config.length; index++) {
        try {
          self.add(
            JSON.parse(fs.readFileSync(config[index]))
          )
        }
        catch(error) {
          if ( !(optional && error instanceof Error && error.code == 'ENOENT') ) {
            throw error;
          }
        }

      }
    }

    return this;
  },

  addDefaults: function() {
    this.addConfig(DEFAULTS_CONFIG_FILENAME);
    return this;
  },

  getResources: function() {
    return this.resources;
  }

};