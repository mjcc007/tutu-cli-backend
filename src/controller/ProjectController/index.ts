import { Context } from 'koa'
import DBService from '../../service';
import { ResultVO } from '../../VO';
import { IProjectInfo, IQuery } from 'src/service/ProjectService';
export default class ProjectController {
  /**
   * 创建一个新项目
   * @param project
   */
  public static async addProject(project:IProjectInfo) {
    if (project.name === "" || project.name === undefined) {
      return ResultVO.buildError(-1, 'project name can not null!');
    }
    let isExist = await DBService.ProjectService.isExistName(project.name);
    if (isExist) {
      return ResultVO.buildError(-1, 'it is suggested to change the name');
    }
    const response = await DBService.ProjectService.createProject(project);
    if (response) {
     return ResultVO.buildSuccess(response);
    } else {
      return ResultVO.buildError();
    }
  }

  /**
   * 根据条件查询存在的项目
   * @param query
   */
  public static async findProjects(query:IQuery) {
    if (query.pageIndex === null || query.pageSize === null) {
      return ResultVO.buildError(-1, 'query params can not null!');
    }
    const result = await DBService.ProjectService.findAll(query);
    if (result) {
      return ResultVO.buildSuccess(result);
    } else {
      return ResultVO.buildError();
    }
  }
  /**
   * delete the project by id
   */
  public static async delProjectById(id:string) {
    if (id === "" || id === null) {
      return ResultVO.buildError(-1, 'the id can not null!');
    }
    const result = await DBService.ProjectService.delById(id);
    if (result) {
      return ResultVO.buildSuccess(result);
    } else {
      return ResultVO.buildError(-1, 'delete failed!');
    }
  }
}
