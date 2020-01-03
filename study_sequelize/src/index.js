const Koa = require('koa');
const app = new Koa();

const db = require('../models/index.js');
const models = require('../models');

app.use(ctx => {
    ctx.body = 'Hello Koa';
});

app.listen(4000, () => {
  console.log('sequelize is listening to port 4000');
  db.sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  models.user.create({
    firstName: 'Joohee',
    lastName: 'Kwon'
  }).then(joohee => {
    console.log('joohee : ', joohee.id);
  });
  //force:true 는 이미 같은 테이블이 생성되어 있다면, 그 테이블을 drop하는 코드이다.

  // db.sequelize.close();
  // sequelize의 연결은 다음과 같이 종료할 수 있다.
});
// 다른 쿼리 예시
// models.user.findAll().then(users => {
//   console.log("All users : ", JSON.stringify(users));
// });
