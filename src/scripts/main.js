/*global require*/

(function() {
  'use strict';

  require.config({
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      'localstorage': {
        deps: ['backbone']
      },
      bootstrap: {
        deps: ['jquery'],
        exports: 'jquery'
      }
    },
    paths: {
      jquery: '../bower_components/jquery/jquery',
      backbone: '../bower_components/backbone/backbone',
      bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',

      // The full marionette package with wreqr and babysitter
      // Fails when building — require pulls in undefined Marionette object
      //marionette: '../bower_components/marionette/lib/backbone.marionette',
      // The amd build of marionette with external dependencies
      marionette: '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
      'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
      'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',

      underscore: '../bower_components/lodash/dist/lodash',
      templates: 'templates',
      localstorage: '../bower_components/backbone.localstorage/backbone.localStorage'
    }
  });

  require([
    'app',
    'backbone',
    'modules/home/HomeModule',
    'utils'
  ], function(app, Backbone, HomeModule) {
    window.app = app;

    app.on('initialize:after', function(options) {
      app.home.start({
        region: app.mainRegion
      });

      if (Backbone.history) {
        Backbone.history.start({
          pushState: false
        });
      }
    });

    app.start();
  });

}());

