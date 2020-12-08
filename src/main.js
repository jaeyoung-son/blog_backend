import Dotenv from 'dotenv';
Dotenv.config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import jwtMiddleware from './lib/jwtMiddleware';

import api from './api';
// import createFakeData from './createFakeData';

const { PORT, MONGO_URI } = process.env;

const app = new Koa();
const router = new Router();

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connecnted to MongoDB');
    // createFakeData();
  })
  .catch(e => {
    console.error(e);
  });

//라우터 설정
router.use('/api', api.routes()); //api 라우트 적용

// *라우터 적용 전* bodyParser 적용
app.use(bodyParser());
// router 미들웨어를 적용하기 전에 이루어져야함
app.use(jwtMiddleware);

// app 인스턴서에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
