import { Context } from 'koa'
import DBService from '../../service';
import { ResultVO } from '../../VO';
import { IProjectInfo, IQuery } from 'src/dao/ProjectMapper';
import {JsonController, Param, Body, Get, Post, Put, Delete} from "routing-controllers";


@JsonController("/project")
export default class ProjectController {
  /**
   * 创建一个新项目
   * @param project
   */
  @Post("/create")
  public async addProject(@Body() project:IProjectInfo) {
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
   *
   * @param query 更新一个项目
   */
  @Post("/update")
  public async updateProject(@Body() project:IProjectInfo) {
    if (project._id === "" || project._id === undefined) {
      return ResultVO.buildError(-1, 'project not exist!');
    }
    const response = await DBService.ProjectService.updateTheProject(project);
    return response === false ? ResultVO.buildError() : ResultVO.buildSuccess(response);
  }


  /**
   * 根据条件查询存在的项目
   * @param query
   */
  @Post("/find")
  public async findProjects(@Body() query:IQuery) {
    try {
      if (query.pageIndex === null || query.pageSize === null) {
        return ResultVO.buildError(-1, 'query params can not null!');
      }
      const result = await DBService.ProjectService.findAll(query);
      if (result) {
        return ResultVO.buildSuccess(result);
      } else {
        return ResultVO.buildError();
      }
    } catch(err) {
      console.log(err);
    }
  }
  /**
   * delete the project by id
   */
  @Post("/del/:id")
  public async delProjectById(@Param("id") id:string) {
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

  @Post("/test")
  public getAll() {
    return {
      name: "test"
    };
  }
}
