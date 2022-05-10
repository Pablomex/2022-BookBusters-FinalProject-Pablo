require('dotenv').config();

const debug = require('debug')('Server');
const app = require('./app/app');

const port = process.env.PORT || 5000;

app.listen(port, () => {
    debug(`Server started on http://localhost:${port}`);
});
