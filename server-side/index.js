const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const registrtion = require('./routs/registrtion');
const adminRouts = require('./routs/adminRouts');
const userRout = require('./routs/userRout');

app.use(cors());
app.use(bodyParser.json());

app.use('/registrtion', registrtion);
app.use('/adminRouts', adminRouts);
app.use('/userRout', userRout);

app.listen(process.env.PORT, () => {
    console.log('run');
});