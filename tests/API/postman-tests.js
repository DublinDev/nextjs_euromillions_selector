const newman = require('newman'); // require newman in your project

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./LotterySelector.postman_collection.json'),
    environment: require('./LotteryProject-dev.postman_environment.json'),
    globals: require('./globals.json'),
    folder: "Tests",
    reporters: 'cli'
}, function (err) {
    if (err) { throw err; }
    console.log('collection run complete!');
});