const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Yeswanth Kumar Kaluva — Portfolio REST API Documentation',
      version: '1.0.0',
      description: 'Enterprise RESTful API documentation for projects, skills, experience, certificates, contact messages, and admin authentication.',
      contact: {
        name: 'Yeswanth Kumar Kaluva',
        email: 'yeswanthkaluva@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Local Development Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT Access Token'
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/docs/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
