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
      this.appendConfig(options);
    }
    else if (Array.isArray(options)) {
      this.append(options);
    }
    else if (options && typeof options == 'object') {
      if (options.configs) {
        this.appendConfig(options.configs);
      }
      if (options.config) {
        this.appendConfig(options.config);
      }
      if (options.resources) {
        this.append(options.resources);

      }
    }
  },

  append: function(list) {
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

  appendConfig: function(configs) {
    var
      index;
    if (!Array.isArray(configs)) {
      configs = [configs];
    }

    for (index = 0; index < configs.length; index++) {
      this.append(
        JSON.parse(fs.readFileSync(configs[index]))
      )
    }
  },

  getResources: function() {
    return this.resources;
  }

};