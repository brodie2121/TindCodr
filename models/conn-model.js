const pgp = require('pg-promise')({
    query: e => {
        console.log('QUERY: ', e.query);
    }
});

const options = {
    host: 'localhost',
    database: 'tindcodr',
    password: 'Fiddle123'
};
const db = pgp(options);
module.exports = db;