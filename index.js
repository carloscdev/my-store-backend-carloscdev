const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

dotenv.config();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB
require('./config/database');

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
  console.log(`Server run in port http://localhost:${port}`)
})
