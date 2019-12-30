
import DBService from '../../service';
import { ResultVO } from '../../VO';
import { ILibInfo, IQuery } from 'src/dao/LibMapper';
import {JsonController, Param, Body, Get, Post, Put, Delete} from "routing-controllers";

@JsonController("/lib")
export default class LibController {
  /**
   * 创建一个新项目
   * @param lib
   */
  @Post("/create")
  public async addLib(@Body() lib:ILibInfo) {
    if (lib.name === "" || lib.name === undefined) {
      return ResultVO.buildError(-1, 'project name can not null!');
    }
    let isExist = await DBService.LibService.isExistName(lib.name);
    if (isExist) {
      return ResultVO.buildError(-1, 'it is suggested to change the name');
    }
    const response = await DBService.LibService.createLib(lib);
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
  @Post("/find")
  public async findLibs(@Body() query:IQuery) {
    if (query.pageIndex === null || query.pageSize === null) {
      return ResultVO.buildError(-1, 'query params can not null!');
    }
    const result = await DBService.LibService.findAll(query);
    if (result) {
      return ResultVO.buildSuccess(result);
    } else {
      return ResultVO.buildError();
    }
  }

  @Post("/optionlist")
  public async cookOptions() {
    const result = await DBService.LibService.findOptMapper();
    if (result) {
      return ResultVO.buildSuccess(result);
    }
    return ResultVO.buildError(-1, "db error");
  }


  /**
   * delete the project by id
   */
  @Post("/del/:id")
  public async delLibById(@Param("id") id:string) {
    if (id === "" || id === null) {
      return ResultVO.buildError(-1, 'the id can not null!');
    }
    const result = await DBService.LibService.delById(id);
    if (result) {
      return ResultVO.buildSuccess(result);
    } else {
      return ResultVO.buildError(-1, 'delete failed!');
    }
  }

  @Post("/find/:id")
  public async findLibById(@Param("id") id:string) {
    if (id === "" || id === null) {
      return ResultVO.buildError(-1, 'the id can not null!');
    }
    const result = await DBService.LibService.findById(id);
    if (result) {
      return ResultVO.buildSuccess(result);
    } else {
      return ResultVO.buildError(-1, 'delete failed!');
    }
  }
}
