import Koa from 'koa';
import Router from 'koa-router';
import Pug from 'koa-pug';
import path from 'path';
import proxy from 'koa-proxy';
import mount from 'koa-mount';
import serve from 'koa-static';

const app = new Koa();
const router = new Router();

new Pug({
  app,
  viewPath: path.join(__dirname, 'views'),
});

if (process.env.NODE_ENV !== 'production') {
  app.use(proxy({
    host: 'http://client:3001',
    match: /^\/assets\//,
  }));
} else {
  app.use(mount('/assets', serve(path.resolve('assets'))));
}

router.get('/api/ping', ctx => {
  ctx.body = {
    data: 'pong',
  };
});

router.get('/', async ctx => {
  await ctx.render('index');
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log(`🚀 Listening on port: 3000`);
});
