import * as KoaRouter from 'koa-router'
// import {
//   ProjectController, LibController
// } from '../controller';

const router = new KoaRouter();
// /* **********************project routers*********************** */
// router.post('/api/project/create', async ctx => {
//   let ret = await ProjectController.addProject(ctx.request.body);
//   ctx.body = ret
// })
// router.post('/api/project/find', async (ctx) => {
//   let ret = await ProjectController.findProjects(ctx.request.body);
//   ctx.body = ret
// });
// router.post('/api/project/del', async (ctx) => {
//   let ret = await ProjectController.delProjectById(ctx.request.body.id);
//   ctx.body = ret
// });


// /* **********************Lib routers*********************** */
// router.post('/api/lib/create', async ctx => {
//   let ret = await LibController.addLib(ctx.request.body);
//   ctx.body = ret
// })
// router.post('/api/lib/find', async (ctx) => {
//   let ret = await LibController.findLibs(ctx.request.body);
//   ctx.body = ret
// });
// router.post('/api/lib/del', async (ctx) => {
//   let ret = await LibController.delLibById(ctx.request.body.id);
//   ctx.body = ret
// });


export default router;

