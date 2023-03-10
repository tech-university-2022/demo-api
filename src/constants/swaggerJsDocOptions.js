const SWAGGER_JS_DOC_OPTIONS = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Demo API with Swagger',
      version: '1.0.0',
      description: 'Swagger UI demonstration',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['src/constants/swaggerSpecification.js'],
};

module.exports = SWAGGER_JS_DOC_OPTIONS;
