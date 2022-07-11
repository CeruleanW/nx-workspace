'use strict';
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();

let port = parseInt(process?.env?.PORT);
// if (port === null || port === NaN || port < 0) {
  port = 3000;
// }
app.use(cors());

//Simple test
app.get('/', (req, res) => {
  // console.debug(req?.body);
  res.send("This is Asher's API");
});

//Static files
app.use('/static', express.static(path.join(__dirname, 'assets')));

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
