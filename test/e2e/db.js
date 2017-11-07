const connect = require('../../lib/connect');
const url = 'mongodb://localhost:27017/space-sim-test';
const mongoose = require('mongoose').connection;

before(() => connect(url));
after(() => mongoose.close());

module.exports = {
    drop() {
        return mongoose.dropDatabase();
    }
};