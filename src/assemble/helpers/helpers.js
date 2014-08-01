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

    // Used to remove the first part of a path.
    // Useful to accomodate for the `dist` folder that's referenced during builds.
    Handlebars.registerHelper('pathShift', function(path) {
      var parts = path.split('/');
      parts.shift();
      return parts.join('/');
    });

    // Render JSON
    // http://stackoverflow.com/a/10233247
    Handlebars.registerHelper('json', function(context) {
      return JSON.stringify(context);
    });

    // http://stackoverflow.com/a/16315366
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
      switch (operator) {
          case '==':
              return (v1 == v2) ? options.fn(this) : options.inverse(this);
          case '===':
              return (v1 === v2) ? options.fn(this) : options.inverse(this);
          case '!=':
              return (v1 != v2) ? options.fn(this) : options.inverse(this);
          case '<':
              return (v1 < v2) ? options.fn(this) : options.inverse(this);
          case '<=':
              return (v1 <= v2) ? options.fn(this) : options.inverse(this);
          case '>':
              return (v1 > v2) ? options.fn(this) : options.inverse(this);
          case '>=':
              return (v1 >= v2) ? options.fn(this) : options.inverse(this);
          case '&&':
              return (v1 && v2) ? options.fn(this) : options.inverse(this);
          case '||':
              return (v1 || v2) ? options.fn(this) : options.inverse(this);
          default:
              return options.inverse(this);
      }
  });

  };
}).call(this);
