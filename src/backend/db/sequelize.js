const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const SequelizeAuto = require('sequelize-auto')
const basename = path.basename(__filename);
const config = require('../../config/default.json');
// const config = require('config');

const db = {};

const {
    host,
    user,
    password,
    database,
    port
} = config.db.mysql;

console.log(host + " " + user + " " + password + " " + database + " " + port);

const sequelize = new Sequelize(database, user, password, {
    host,
    pool: {
        max: 1,
        min: 1,
        acquire: 30000,
        idle: 10000,
    },
    dialect: 'mysql',
    port: port,
    define: {
        timestamps: false,
    },
});

sequelize.authenticate().then(() => {
    console.log('MySQL connected!');
}).catch((err) => {
    // TODO: throw and stop service if db goes down
    throw err;
});

fs
    .readdirSync(path.join(__dirname,'..','models'))
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = require(path.join(path.join(__dirname, '..', 'models'), file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const option = {
    directory: './src/backend/models', // where to write files
    additional: {
        timestamps: false
        // ...options added to each model
    },
    noInitModels: true,
    tables: ["vendors"], // use all tables, if omitted
}

// uncomment this code when you want to fetch the model from db and change the option accordingly
const auto = new SequelizeAuto(sequelize, null, null, option);
// auto.run();

module.exports = db;
global.db = db;