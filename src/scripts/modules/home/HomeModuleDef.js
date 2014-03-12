define(function (require) { 'use strict';

  var def = function (home, app, Backbone, Marionette, $, _) {

    var api = {
      home: function () {
        home.controller.home();
      }
    };

    var Router = Marionette.AppRouter.extend({
      routes: {
        '*default': 'home',
        'home': 'home'
      },
      home: function () {
        api.home();
      }
    });

    var Controller = Marionette.Controller.extend({
      home: function () {
        var view = new app.home.HomeView();
        this.region.show(view);
      }
    });

    home.on('start', function(options){
      this.controller.region = options.region;
    });

    home.addInitializer(function () {
      this.router = new Router();
      this.controller = new Controller();
    });

    var router = new Router();
  };

  return {
    startWithParent: false,
    define: def
  };

});
