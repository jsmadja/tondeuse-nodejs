const express = require('express');
const app = express();
const swagger = require('./swagger');
const LawnRoutes = require('./routes/lawn-routes');
const MowerRoutes = require('./routes/mower-routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/', swagger());
app.use('/lawn', LawnRoutes);
app.use('/mower', MowerRoutes);

if (!module.parent) {
    app.listen(3000, () => {
        // eslint-disable-next-line no-console
        console.log(`
        Mower API listening on port 3000
        Documentation available at http://localhost:3000/api-docs/
        `);
    });
}
module.exports = app;
