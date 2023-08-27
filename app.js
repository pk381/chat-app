const express = require('express');
const path = require('path');

const app = express();


// routes
const userRoute = require('./routes/user');

// static files
app.use(express.static(path.join(__dirname, "public")));

app.use('/user', userRoute);

console.log("listening");
app.listen(4000);