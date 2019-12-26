import * as KoaRouter from 'koa-router'
import { ResultVO } from '../VO';
import {
  ProjectController
} from '../controller';

const router = new KoaRouter();

router.post('/api/project/create', async ctx => {
  let ret = await ProjectController.addProject(ctx.request.body);
  ctx.body = ret
})
router.post('/api/project/find', async (ctx) => {
  let ret = await ProjectController.findProjects(ctx.request.body);
  ctx.body = ret
});
router.post('/api/project/del', async (ctx) => {
  let ret = await ProjectController.delProjectById(ctx.request.body.id);
  ctx.body = ret
});

export default router;

