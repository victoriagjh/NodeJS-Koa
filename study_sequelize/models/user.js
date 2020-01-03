'use strict';

const Sequelize = require('sequelize');
const db = require('./index.js');

const Model = Sequelize.Model;
// class User extends Model {}
// User.init({
//   //attributes
//   firstName: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: Sequelize.STRING
//     //allowNull의 Default는 null임
//   }
// },{
//   sequelize,
//   modelName:'user'
//   //options
// });
// 이렇게 Model 생성이 가능하고, HumanScape에서는 아래와 같이 model을 정의함.

module.exports = (sequelize) => {
  const user = sequelize.define('user',{
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
      //allowNull의 Default는 null임
    }
  }, {
    timestamps: true
    //options
  });
  // sequelize의 define 함수는 Models.init을 호출한다.
  user.sync({force: false});

  return user;
};
