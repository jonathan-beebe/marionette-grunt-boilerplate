define(function (require) { 'use strict';

  var app = require('app');
  var HomeView = require('./HomeView');
  var def = require('./HomeModuleDef');

  app.module('home', def);
  app.home.HomeView = HomeView;

});
