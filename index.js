const pug     = require('pug');
const through = require('through2');

const PLUGIN_NAME = 'gulp-pug-3';

const pugOptKeys = [
	'client',                 // added to original pug options
	'extension',              // "
	'locals',                 // "
	'filename',
	'basedir',
	'doctype',
	'pretty',                 // deprecated
	'filters',                // defaults to undefined
	'self',
	'debug',
	'compileDebug',
	'globals',
	'cache',                  // render
	'inlineRuntimeFunctions', // compileClient
	'name'                    // compileClient
];

module.exports = (optsBase) => {

    optsBase = optsBase || {};
    const keys = Object.keys(optsBase);

    keys.forEach((key) => {
        if (pugOptKeys.indexOf(key) < 0) {
            throw new Error(`${PLUGIN_NAME}: Undefined pug option '${key}'. Allowed options are ${pugOptKeys.toString()}`);
        }
    });

    return through.obj((file, encoding, callback) => {
        // don't re-use opts as we may be called by gulp multiple times
        // for different files
        const opts = Object.assign({}, optsBase);

        if (!file.isBuffer()) {
            throw new Error(`${PLUGIN_NAME}: Buffer Only!`);
        }

        try {

            opts.extension = opts.extension && opts.extension.trim().replace(/^\.*/, '.');

            const ext = opts.extension || (opts.client ? '.js' : '.html');
            const path = file.path;

            opts.filename = opts.filename || path;

            const fileLocals = (file.data == null || typeof file.data !== 'object') ? {} : file.data;
            const locals = Object.assign({}, (opts.locals || {}), fileLocals);
            const contents = file.contents.toString();
            const compiled = opts.client
                    ? pug.compileClient(contents, opts)
                    : pug.compile(contents, opts)(locals);

            file.path = path.replace(/\.[^.]+$/, ext);
            file.contents = Buffer.from(compiled, encoding);

        } catch (e) {
            throw new Error(`${PLUGIN_NAME}: ${e}`);
        }

        callback(null, file);
    });
};
