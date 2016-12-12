var express = require('express');
var PORT = process.env.PORT || 8080;

var app = express(); // Create an application object

// app.use are executed for every request the server receives
app.use(express.static('Public')); // If a URL that is requested matches a filepath that is INSIDE of the public folder.  Express will automatically send that file down to the browser

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});