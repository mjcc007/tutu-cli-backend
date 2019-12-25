import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as cors from 'koa2-cors';
import * as koaBodyparser from 'koa-bodyparser'
import * as mongoDB from './mongoDB';
import router from './routers';
import config from './config';
// 创建app
const app = new Koa();

// 连接数据库
mongoDB.connect();
app.use(
      cors({
        origin: () => '*',
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);
app.use(logger())
  .use(koaBodyparser())
  .use(router.routes())
  .use(router.allowedMethods());
// 开启serve
app.listen(config.server.port);
console.log(`Server running on port ${config.server.port}`);

