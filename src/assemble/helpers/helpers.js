(function() {
  module.exports.register = function(Handlebars, options, params) {

    Handlebars.registerHelper('concat', function(strLeft, strRight) {
      return new Handlebars.SafeString(strLeft + strRight);
    });

    // http://stackoverflow.com/a/18431716
    Handlebars.registerHelper('partial', function(name, ctx, hash) {
      var ps = Handlebars.partials;
      if(typeof ps[name] != 'function') {
        ps[name] = Handlebars.compile(ps[name]);
      }
      return ps[name](ctx, hash);
    });

  };
}).call(this);
