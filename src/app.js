const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SWAGGER_JS_DOC_OPTIONS = require('./constants/swaggerJsDocOptions');
const routes = require('./routes');

const app = express();

// Parse body to json
app.use(express.json());

app.use('', routes);

const specs = swaggerJsdoc(SWAGGER_JS_DOC_OPTIONS);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started running on port ${process.env.PORT || 3000}`);
});

module.exports = { app, server };
