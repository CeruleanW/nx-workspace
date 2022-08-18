'use strict';
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
// const jwt = require('jsonwebtoken');
// const fs = require('fs');

// function testJWT() {
//   const priv = fs.readFileSync('./google_gcp_asher01_private.pem');
//   // console.log('read file', priv);
//   const payload = {
//     // "iat": 1660231351,
//     // "exp": 1660731351,
//     "aud": "safetracks"
//   };
//   const token = jwt.sign(payload, priv, { algorithm: 'ES256', expiresIn: "24h", }, function(err, token) {
//     console.log('token', token);
//     console.error('Error', err.message);
//   });
//   console.log('token', token);
// }


let port = parseInt(process?.env?.PORT);
port = 3000;
app.use(cors());

//Simple test
app.get('/', (req, res) => {
  // console.debug(req?.body);
  res.send("This is Asher's API");
});

//Static files
app.use('/static', express.static(path.join(__dirname, 'data')));

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});

// testJWT();
