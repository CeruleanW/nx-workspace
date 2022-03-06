'use strict';
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();

let port = process.env.PORT as any;
if (port == null || port == '') {
  port = 8000;
}
app.use(cors());

//Simple test
app.get('/', (req, res) => {
  // console.log(req);
  console.log(req.body);
  res.send("This is Asher's API");
});

//Static files
app.use('/static', express.static(path.join(__dirname, 'assets')));

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
