describe('when using the home module', function () {
  'use strict';

  var app;
  var $ = require('jquery');
  var Marionette = require('marionette');
  var HomeView = require('modules/home/HomeView');
  var HomeModuleDef = require('modules/home/HomeModuleDef');

  beforeEach(function () {
    app = new Marionette.Application();
    app.addRegions({
      mainRegion: 'body'
    });
    app.module('home', HomeModuleDef);
  });

  afterEach(function () {
    app = null;
  });

  it('the module exists', function () {
    expect(app.home).not.toBe(null);
  });
});
