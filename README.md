# gulp-pug-2

Gulp Pug plugin

Compile your Pug templates into 'html' or 'js';
Always uses the latest version of Pug.

## Example

```javascript
var pug = require('gulp-pug');

gulp.task('build', function () {
  return gulp.src('public/**/*.pug')
        .pipe(pug({
            // Your options.
        }))
        .pipe(gulp.dest('dist');
});
```

## Api

In addition to Pug's API: client, extension and locals options are available. 

## LICENSE

[MIT][license] &copy; Orçun Saltık
