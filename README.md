# Kuali Student Design Guide

UI patterns and design guidelines for Kuali Student.
The [KS Design Guide](http://ksux.github.io/ks-design-guide/)
will supersede the wiki-based
[User Interaction Model](https://wiki.kuali.org/display/STUDENTDOC/User+Interaction+Model)
and the
[KS UI Style Guide](https://wiki.kuali.org/pages/viewpage.action?title=KS+UI+Style+Guide&spaceKey=STUDENT)
(a recent experimental refactoring of the UIM) once the information has been
appropriately ported.

## Getting started

1. Download and install [Node](http://nodejs.org).
- Install global environment dependencies: `npm install -g gulp bower grunt-cli`
- Install project dependencies: `npm install && bower install`

## Tasks

### Serve

The default task will:

1. Remove any previously generated files.
- Copy assets, compile CSS, and generate static files.
- Start and launch local server, opening the project in a web browser.

```
gulp
```

### Deploy

Publishes generated site via [GitHub Pages](https://pages.github.com) to
http://ksux.github.io/ks-design-guide/.

```
gulp deploy
```

## Resources
- [Assemble](http://assemble.io) for static site generation.
- [gulp](http://gulpjs.com) for task management.
- [Handlebars](http://handlebarsjs.com) for template processing.
- [Less](http://lesscss.org) for CSS preprocessing.
