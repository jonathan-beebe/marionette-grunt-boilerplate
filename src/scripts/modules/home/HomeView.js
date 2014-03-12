define(function(require) {
  'use strict';

  var Marionette = require('marionette');
  var _ = require('underscore');

  var View = Marionette.ItemView.extend({
    template: _.template('<h1>Hello</h1>')
  });

  return View;
});
