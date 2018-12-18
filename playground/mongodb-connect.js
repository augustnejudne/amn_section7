const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to mongodb server');
    }
    const db = client.db('TodoApp');
    console.log('Connected to mongodb server');

    const Todos = db.collection('Todos');
    const Users = db.collection('Users');

    // Todos.find({complete: false}).count()
    //   .then((count) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(count, undefined, 2));
    //   }, (err) => {
    //     console.log(err);
    //   });

    // Todos.updateOne({ text: 'walk the dog' }, { $rename: { 'completed': 'complete' } });

    // Users.insert({name: 'Linus Cloud', age: 1, location: 'Dumaguete'}, (err, response) => {
    //   if (err) {
    //     return console.log(err);
    //   }

    //   console.log(response);
    // });

    // Users.findAndRemove({name: 'Kim Nejudne'}, (err, response) => {
    //   (err) ? console.log(err) : console.log(response);
    // })

    // Users.insert({
    //   firstName: 'Kim',
    //   lastName: 'Nejudne',
    //   age: 30,
    //   gwapo: true
    // }, (err, response) => {
    //   console.log(err ? err : response);
    // })

    Users.findOneAndUpdate({ firstName: 'Kim' }, { $set: { firstName: 'August'}}, (err, response) => {
      console.log(err ? err : response);
    })


    client.close();
  }
);
