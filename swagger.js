const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Clean energy vehicle API',
    description: 'Clean energy vehicle API includes electric vehicle and hydrogen vehicle project'
  },
  host: 'cse341-project2-tsh7.onrender.com',
  // host: 'localhost:3001',
  schemes: ['https']
  // schemes: ['http']
 
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

// swaggerAutogen(outputFile, routes, doc);

// Run server after it gets generated
swaggerAutogen(outputFile, routes, doc).then(async () => {
  await import('./server.js');
});