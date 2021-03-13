const path = require('path');

require('@babel/register')({
  extensions: ['.es6', '.es', '.jsx', '.js', '.mjs'],
  cwd: path.join(__dirname, '../..'),
});
