import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../src/lib/rethinkDb/rethinkConstants.js';
import rh from '../src/lib/rethinkDb/rethinkHelpers.js';
import UserDal from '../src/lib/dal/Users.js';

let users = new UserDal();

rh.connect((error, connection) => {
    if (error) {
        throw error;
    }
    console.log('Setting up the database...');
    async.series([
        (next) => rh.createDb(connection, rc.DB_GEARZ_GLOBAL, next),
        (next) => rh.createTable(connection, rc.DB_GEARZ_GLOBAL, rc.TABLE_USERS, next),
        (next) => users.create(connection, { userName: rc.USER_ADMIN, pictureUrl: 'myPic' }, next),
        () => {
            console.log('Everything looks good');
            connection.close();
        }
    ]);
});