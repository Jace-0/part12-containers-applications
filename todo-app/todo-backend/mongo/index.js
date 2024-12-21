const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')
// const MONGO_URL = 'mongodb://root:example@localhost:3456/the_database';
if (MONGO_URL && !mongoose.connection.readyState) mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000, }).then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit on failure
  });


module.exports = {
  Todo
}
