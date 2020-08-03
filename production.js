const path = require('path');
const Application = require('thinkjs');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const instance = new Application({
  ROOT_PATH: __dirname,
  APP_PATH: path.join(__dirname, 'app'),
  proxy: true, // use proxy
  env: 'production'
});

instance.run();
