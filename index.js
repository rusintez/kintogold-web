/**
 * Kintogold-web
 */

/**
 * Module depencies
 */

const express = require('express');
const Bundler = require('parcel-bundler');

/**
 * Init app
 */

const app = express();
const prod = process.env.NODE_ENV === 'production';

/**
 * Serve bundle
 */

const bundler = new Bundler(__dirname + '/src/index.html', {
  sourceMaps: !prod,
  detailedReport: prod
});

app.use(bundler.middleware());

/**
 * Start server
 */

app.listen(process.env.PORT, () => {
  console.log(`Server is listening in port ${process.env.PORT}`);
});


/**
 * Dev
 */

if (!prod) {
  require('ngrok').connect(process.env.PORT).then((url) => {
    console.log(`Server is publicly accessible via ${url}`);
  });
}
