var Babel = require('babel-core');

module.exports = {
    process: function(src, filename) {
        if (!Babel.canCompile(filename)) {
            return '';
        } else if (filename.indexOf('node_modules') === -1) {
            return Babel.transform(src, {filename: filename}).code;
        } else {
            return src;
        }
    }
};
