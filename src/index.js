const express = require('express');
const app = express();
const port = 5000;
require('dotenv').config();
const cors = require('cors');
const DB = require('./database')
const route = require('./routes/index');




//Connect to database
DB.connectDB();

app.use(express.json());
app.use(cors());


route(app);





app.listen(port, () => console.log(`http://localhost:${port}`));