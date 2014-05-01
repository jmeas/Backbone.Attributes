// Backbone.Attributes.js 0.5.1
// ---------------

//     (c) 2014 Adam Krebs
//     Backbone.Attributes may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/akre54/Backbone.Attributes

(function (factory) {
  if (typeof define === 'function' && define.amd) { define(['underscore', 'backbone'], factory);
  } else if (typeof exports === 'object') { module.exports = factory(require('underscore'), require('backbone'));
  } else { factory(_, Backbone); }
}(function (_, Backbone) {
  var Attributes = _.extend({}, Backbone.Events);
  var modelMethods = ['get', 'set', 'unset', 'clear', '_validate', 'validate', 'isValid', 'has', 'changed', 'hasChanged', 'changedAttributes', 'previous', 'previousAttributes'];
  var wrappedMethods = ['get', 'set', 'clear', 'changedAttributes'];

  var Model = Backbone.Model.prototype;

  _.each(modelMethods, function(method) {
    var fn = Model[method];
    var wrapper = function() {
      this.attributes = _.defaults({}, this.attributes, _.result(this, 'defaults'));
      _.each(wrappedMethods, function(wrapped) { this[wrapped] = Model[wrapped]; }, this);
      return fn.apply(this, arguments);
    };
    Attributes[method] = _.contains(wrappedMethods, method) ? wrapper : fn;
  });

  Attributes.setAttribute = Attributes.setAttributes = Attributes.set;
  Attributes.getAttribute = Attributes.get;

  return Backbone.Attributes = Attributes;
}));
