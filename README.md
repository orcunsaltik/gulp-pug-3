# gulp-pug-3

Gulp Pug plugin

Compile your Pug templates into 'html' or 'js'.

Always uses the latest version of Pug.

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
  return gulp.src('public/**/*.pug')
        .pipe(pug({
            // Your options.
        }))
        .pipe(gulp.dest('dist');
);

gulp.task('build:X', () => 
    gulp.src('public/**/*.pug')
        .pipe(pug({
               locals: { dir: 'rtl', lang: 'es' },
            extension: 'htm',
            // Pug API default opts...
              basedir: `${__dirname}/public`
        }))
        .pipe(gulp.dest('dist');
);
```
