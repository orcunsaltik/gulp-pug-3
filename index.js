/**
 * gulp-pug-3 - Gulp plugin for Pug 3.x template engine
 * Modern, type-safe, and fully compatible with Pug 3.x
 */

const { Transform } = require('stream');
const PluginError = require('plugin-error');
const path = require('path');
const pug = require('pug');

const PLUGIN_NAME = 'gulp-pug-3';

/**
 * Valid Pug 3.x compilation options (whitelist for validation)
 * @see https://pugjs.org/api/reference.html
 */
const VALID_PUG_OPTIONS = new Set([
  'filename', // Name of the file being compiled (required for includes/extends)
  'basedir', // Root directory for absolute includes
  'doctype', // Default doctype (e.g., 'html', 'xml')
  'pretty', // Deprecated in Pug 3, but still supported
  'filters', // Hash of custom filters
  'self', // Use 'self' namespace for locals
  'debug', // Output debugging information
  'compileDebug', // Include function source in compiled template for better errors
  'globals', // Array of global variable names
  'cache', // Enable template caching
  'inlineRuntimeFunctions', // Inline runtime functions (reduces size)
  'name', // Template function name (client mode)
  'client', // Compile to JavaScript function string
  'extension', // Output file extension (default: .html for server, .js for client)
  'locals', // Template variables
  'plugins' // Array of Pug plugins
]);

/**
 * Validate Pug options against whitelist
 * @param {Object} options - User-provided options
 * @throws {PluginError} If invalid option is found
 */
function validateOptions(options) {
  for (const key of Object.keys(options)) {
    if (!VALID_PUG_OPTIONS.has(key)) {
      throw new PluginError(
        PLUGIN_NAME,
        `Invalid Pug option: '${key}'\nAllowed options: ${[...VALID_PUG_OPTIONS].sort().join(', ')}`
      );
    }
  }
}

/**
 * Main plugin function
 * @param {Object} [options={}] - Pug compilation options
 * @param {boolean} [options.client=false] - Compile to client-side JavaScript function
 * @param {string} [options.extension] - Output file extension (default: .html or .js)
 * @param {Object} [options.locals={}] - Template variables
 * @param {string} [options.filename] - Override source filename
 * @param {string} [options.basedir] - Base directory for includes
 * @param {boolean} [options.compileDebug=false] - Include debug info
 * @param {Array} [options.plugins=[]] - Pug plugins
 * @returns {Transform} Gulp transform stream
 *
 * @example
 * // Server-side HTML compilation
 * gulp.src('src/*.pug')
 *   .pipe(pug({ pretty: true, locals: { title: 'My Site' } }))
 *   .pipe(gulp.dest('dist'))
 *
 * @example
 * // Client-side JS compilation
 * gulp.src('src/templates/*.pug')
 *   .pipe(pug({ client: true, name: 'myTemplate' }))
 *   .pipe(gulp.dest('dist/js'))
 */
module.exports = function (options = {}) {
  // Validate options early (fail fast)
  validateOptions(options);

  return new Transform({
    objectMode: true,

    transform(file, encoding, callback) {
      // Pass through null files (e.g., empty directories in glob)
      if (file.isNull()) {
        return callback(null, file);
      }

      // Reject streaming mode (only buffer supported)
      if (file.isStream()) {
        return callback(
          new PluginError(
            PLUGIN_NAME,
            'Streaming not supported. Use vinyl-buffer or gulp.src({ buffer: true }).'
          )
        );
      }

      // Handle buffer mode
      if (file.isBuffer()) {
        try {
          // Clone options to avoid mutation
          const opts = { ...options };

          // Set filename (required for includes/extends/line numbers)
          opts.filename = opts.filename || file.path;

          // Set basedir (defaults to file directory)
          if (!opts.basedir) {
            opts.basedir = path.dirname(file.path);
          }

          // Merge locals: options.locals + file.data
          // file.data takes precedence (set by gulp-data or similar)
          const fileLocals = file.data && typeof file.data === 'object' ? file.data : {};
          opts.locals = { ...opts.locals, ...fileLocals };

          // Determine output extension
          const defaultExt = opts.client ? '.js' : '.html';
          const extension = (opts.extension || defaultExt).replace(/^\.+/, '.');

          // Get template source
          const source = file.contents.toString('utf8');

          // Compile based on mode
          let compiled;
          if (opts.client) {
            // Client-side: compile to JavaScript function string
            // Note: locals are NOT used in client mode (they're applied at runtime)
            compiled = pug.compileClient(source, opts);
          } else {
            // Server-side: compile and render immediately
            const templateFn = pug.compile(source, opts);
            compiled = templateFn(opts.locals);
          }

          // Update file
          file.path = file.path.replace(/\.[^.]+$/, '') + extension;
          file.contents = Buffer.from(compiled, 'utf8');

          callback(null, file);
        } catch (err) {
          // Preserve original error details for debugging
          const error = new PluginError(PLUGIN_NAME, err.message || 'Pug compilation failed', {
            fileName: file.path,
            lineNumber: err.line,
            columnNumber: err.column,
            stack: err.stack,
            showStack: true,
            showProperties: true
          });

          callback(error);
        }
      }
    }
  });
};
