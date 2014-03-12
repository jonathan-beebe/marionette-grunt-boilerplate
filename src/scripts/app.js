define([
  'underscore',
  'jquery',
  'backbone',
  'marionette'
], function (_, $, Backbone, Marionette) {
  'use strict';

  var App = Backbone.Marionette.Application.extend({
    routers: {}
  });

  var app = new App();

  app.addRegions({
    mainRegion: '#main'
  });

  app.addInitializer(function () {

  });

  return app;

});
