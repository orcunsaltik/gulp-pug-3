# gulp-pug-3

[![CI](https://github.com/orcunsaltik/gulp-pug-3/actions/workflows/ci.yml/badge.svg)](https://github.com/orcunsaltik/gulp-pug-3/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/gulp-pug-3.svg)](https://www.npmjs.com/package/gulp-pug-3)
[![npm downloads](https://img.shields.io/npm/dt/gulp-pug-3.svg)](https://www.npmjs.com/package/gulp-pug-3)
[![node version](https://img.shields.io/node/v/gulp-pug-3.svg)](https://www.npmjs.com/package/gulp-pug-3)
[![license](https://img.shields.io/npm/l/gulp-pug-3.svg)](https://github.com/orcunsaltik/gulp-pug-3/blob/master/LICENSE)

> Gulp plugin for compiling Pug templates using the latest stable version of Pug Template Engine.

Compiles your Pug templates into HTML or JavaScript easily and always uses the latest stable version of Pug.

## Features

- ✅ Supports the latest Pug version (3.x)
- ✅ Compiles to HTML or JS
- ✅ Custom locals and options
- ✅ Works with Gulp 4.x
- ✅ Modern Node.js support (18+)

## Installation

```bash
npm install --save-dev gulp-pug-3
```

## Usage

### Basic Example

```javascript
const { src, dest } = require('gulp');
const pug = require('gulp-pug-3');

function compilePug() {
  return src('src/**/*.pug')
    .pipe(
      pug({
        // Your options here
      })
    )
    .pipe(dest('dist'));
}

exports.default = compilePug;
```

### With Options

```javascript
const { src, dest } = require('gulp');
const pug = require('gulp-pug-3');

function compilePug() {
  return src('src/**/*.pug')
    .pipe(
      pug({
        locals: {
          siteName: 'My Website',
          lang: 'en'
        },
        pretty: true,
        basedir: __dirname + '/src'
      })
    )
    .pipe(dest('dist'));
}

exports.default = compilePug;
```

### Compile to JavaScript

```javascript
const { src, dest } = require('gulp');
const pug = require('gulp-pug-3');

function compilePugToJs() {
  return src('src/**/*.pug')
    .pipe(
      pug({
        client: true,
        extension: '.js'
      })
    )
    .pipe(dest('dist'));
}

exports.default = compilePugToJs;
```

## API

In addition to [Pug's standard options](https://pugjs.org/api/reference.html), the following options are available:

### `client`

Type: `Boolean`
Default: `false`

Compile to JavaScript template function instead of HTML.

### `extension`

Type: `String`
Default: `.html` (or `.js` if `client: true`)

Output file extension.

### `locals`

Type: `Object`
Default: `{}`

Data to pass to Pug templates. Can also be set via `file.data` (e.g., with gulp-data).

### Other Pug Options

All standard Pug options are supported:

- `filename`
- `basedir`
- `doctype`
- `pretty`
- `filters`
- `self`
- `debug`
- `compileDebug`
- `globals`
- `cache`
- `inlineRuntimeFunctions`
- `name`

See [Pug documentation](https://pugjs.org/api/reference.html) for details.

## Requirements

- Node.js >= 18.0.0
- Gulp >= 4.0.0

## Changelog

### v2.0.0 (2025)

- 🚀 Updated to Pug 3.0.3
- 🚀 Modernized dependencies
- 🚀 Added GitHub Actions CI
- 🚀 Improved code quality with Prettier & ESLint
- 🚀 Node.js 18+ support

### v1.2.2 (2021)

- Previous stable release

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Troubleshooting

When you encounter a problem, please [open an issue](https://github.com/orcunsaltik/gulp-pug-3/issues). I would be glad to help you find a solution.

## Author

**Orçun Saltık**

- GitHub: [@orcunsaltik](https://github.com/orcunsaltik)
- Email: saltikorcun@gmail.com

## License

[MIT](LICENSE) © Orçun Saltık
