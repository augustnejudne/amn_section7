const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
);
