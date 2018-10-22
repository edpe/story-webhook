const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/addaction-stories', {useNewUrlParser: true } )

const connection = mongoose.connection;

connection.on('connected', function () {
  console.log('connected to database');
});

connection.on('disconnected', function () {
  console.log('disconnected from database');
});

connection.on('error', function (error) {
  console.log('database connection error', error);
});

process.on('SIGINT', function() {
  connection.close(function() {
    console.log('db connection closed due to process termination');
    process.exit(0);
  });
});

module.exports = connection;
