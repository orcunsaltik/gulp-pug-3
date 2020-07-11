const pug     = require('pug');
const through = require('through2');

const PLUGIN_NAME = 'gulp-pug-3';

const pugOptKeys = [
    'client',                   // added to original pug options
    'extension',                // "
    'locals',                   // "
    'filename',
    'basedir',
    'doctype',
    'pretty',                   // deprecated
    'filters',                  // defaults to undefined
    'self',
    'debug',
    'compileDebug',
    'globals',
    'cache',                    // render
    'inlineRuntimeFunctions',   // compileClient
    'name'                      // compileClient
];

const gulpPug3 = function (opts) {

    opts = opts || {};
    keys = Object.keys(opts);
    keys.forEach((key) => {
        if (pugOptKeys.indexOf(key) < 0) {
            throw new Error(`${PLUGIN_NAME}: Undefined pug option '${key}'. Allowed options are ${pugOptKeys.toString()}`);
        }
    });

    return through.obj(function (file, encoding, callback) {
    
        if (!file.isBuffer()) {
            throw new Error(`${PLUGIN_NAME}: Buffer Only!`);
        }
        
        try {
           
            opts.extension = opts.extension && opts.extension.trim().replace(/^\.*/, '.');
            
            const ext = opts.extension || (opts.client ? '.js' : '.html');
            const path = file.path;
            
            opts.filename = opts.filename || path;
            
            const locals   = opts.locals || {};
            const contents = file.contents.toString();
            const compiled = opts.client
                    ? pug.compileClient(contents, opts)
                    : pug.compile(contents, opts)(locals);
                                       
            file.path     = path.replace(/\.[^\.]+$/, ext);
            file.contents = Buffer.from(compiled, encoding);           

        } catch (e) {
           throw new Error(`${PLUGIN_NAME}: ${e}`);
        }

        callback(null, file);
    });
};

module.exports = gulpPug3;
