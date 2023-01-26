const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));

const port = process.env.PORT  || 8000;
app.listen(port, () => console.log('listening on port ' + port));