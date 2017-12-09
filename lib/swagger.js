const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

module.exports = () => {

    const options = {
        swaggerDefinition: {
            info: {
                title: 'Mower API',
                version: '1.0.0',
                description: 'Demonstrating how to use RESTful Mower API'
            },
        },
        apis: ['./lib/routes/*.js']
    };

    const router = express.Router(); // eslint-disable-line new-cap
    const swaggerSpec = swaggerJSDoc(options);
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    return router;
};
