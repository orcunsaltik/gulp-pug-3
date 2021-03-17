# Gulp Pug 3

[![Build Status](https://travis-ci.com/orcunsaltik/gulp-pug-3.svg?branch=master)](https://travis-ci.com/orcunsaltik/gulp-pug-3)
[![Dependency Status](https://david-dm.org/orcunsaltik/gulp-pug-3.svg)](https://david-dm.org/orcunsaltik/gulp-pug-3)
[![devDependencies Status](https://david-dm.org/orcunsaltik/gulp-pug-3/dev-status.svg)](https://david-dm.org/orcunsaltik/gulp-pug-3?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/035ff3499e767eb6b552/maintainability)](https://codeclimate.com/github/orcunsaltik/gulp-pug-3/maintainability)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/orcunsaltik/gulp-pug-3)
![npm](https://img.shields.io/npm/dt/gulp-pug-3)
[![NPM Version](https://badge.fury.io/js/gulp-pug-3.svg?style=flat)](https://npmjs.org/package/gulp-pug-3)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/orcunsaltik/gulp-pug-3/issues)
![node-current](https://img.shields.io/node/v/gulp-pug-3)

Compiles your pug templates into 'html' or 'js' easily and always uses the latest stable version of Pug Template Engine.

## Install

``` bash
npm install --save-dev gulp-pug-3
```

## Api

In addition to Pug's API: client, extension and locals options are available. 

## Example

```javascript
const pug = require('gulp-pug-3');

gulp.task('build', () =>
    gulp.src('public/**/*.pug')
        .pipe(
            pug({ 
                // Your options.
            })
        )
        .pipe(gulp.dest('dist'));
);

gulp.task('build:X', () => 
    gulp.src('public/**/*.pug')
        .pipe(
            pug({
                   locals: { dir: 'rtl', lang: 'es' },
                extension: 'htm',
                // Pug API default opts...
                  basedir: `${__dirname}/public`
            })
        )
        .pipe(gulp.dest('dist'));
)
```

## Troubleshooting

When you encounter a problem, please open an issue. I would be glad to help you to find a solution if possible.


## Author

Github: [@orcunsaltik](https://github.com/orcunsaltik)


## License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
