const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const connectDB = require('./utils/database');
const fileUpload = require('express-fileupload');

require('dotenv').config();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
}));

// Connect DB
connectDB()

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
  console.log(`Server run in port http://localhost:${port}`)
})
