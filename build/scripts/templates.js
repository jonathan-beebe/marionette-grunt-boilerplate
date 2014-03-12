this["JST"] = this["JST"] || {};

this["JST"]["views/index"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div id="index-header"></div>';

}
return __p
};

this["JST"]["views/nav"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">\n  <!-- Brand and toggle get grouped for better mobile display -->\n  <div class="navbar-header">\n    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">\n      <span class="sr-only">Toggle navigation</span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n    </button>\n    <a class="navbar-brand" href="#">Grunt Test</a>\n  </div>\n\n  <!-- Collect the nav links, forms, and other content for toggling -->\n  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\n    <ul class="nav navbar-nav">\n\t\t\t';
 _.each(urls, function(label, url) { ;
__p += '\n\t\t\t\t<li class="' +
((__t = ( Backbone.history.fragment == url ? 'active' : '' )) == null ? '' : __t) +
'" data-route-name="' +
((__t = ( url )) == null ? '' : __t) +
'">\n\t\t\t\t\t<a href="#/' +
((__t = ( url )) == null ? '' : __t) +
'">' +
((__t = ( label )) == null ? '' : __t) +
'</a>\n\t\t\t\t</li>\n\t\t\t';
 }); ;
__p += '\n    </ul>\n  </div><!-- /.navbar-collapse -->\n</nav>';

}
return __p
};