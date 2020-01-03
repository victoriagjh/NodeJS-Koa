'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config,{ pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
    // timestamps 필드는 기본적으로 true로 createdAt과 updatedAt 필드가 기본적으로 생성된다.
    // timestamps 필드를 false로 했기 때문에, 각 모델의 options에서 timestamps 활성화 여부를 결정할 수 있다.
  }
});
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config, { pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  } });
}
//싱글 프로세스로부터 데이터베이스를 연결한다면, 하나의 Sequelize instance만을 생성해야 한다.

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
