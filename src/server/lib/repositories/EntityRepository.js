import r from 'rethinkdb';
import _ from 'underscore';
import async from 'async';
import rc from '../database/constants.js';
import objectHelper from '../../../common/lib/helpers/objectHelper';
import dbHelper from '../database/dbHelper.js';
import Repository from './Repository';

class EntityRepository extends Repository {
    constructor(dbName) {
        super({
            dbName: dbName,
            tableName: rc.TABLE_ENTITIES
        });
    }
}

export default EntityRepository;