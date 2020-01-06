import DBService from '../../service';
import { IConfigInfo } from '../../dao/ConfigMapper';
import { ResultVO } from '../../VO';
import {JsonController, Param, Body, Get, Post, Put, Delete} from "routing-controllers"



@JsonController("/config")
export default class ConfigController {

  /**
  * 创建一个新配置
  * @param lib
  */
  @Post("/create")
  public async create(@Body() configInfo:IConfigInfo) {
    if (configInfo.userId === undefined || configInfo.userId === "")
      return ResultVO.buildError(-1, "userid can not null");
    if (configInfo.ownerId === undefined || configInfo.ownerId === "")
      return ResultVO.buildError(-1, "ownerid can not null");
    let response = await DBService.ConfigService.createConfig(configInfo);
    if (response) {
      return ResultVO.buildSuccess(response);
    } else {
      return ResultVO.buildError();
    }
  }


  /**
   * 删除一个配置
   */
  @Post("/del/:id")
  public async delConfigByid(@Param("id") id:string) {
    if (id === "" || id === null) {
      return ResultVO.buildError(-1, 'the id can not null!');
    }
    const result = await DBService.ConfigService.delId(id);
    if (result) {
      return ResultVO.buildSuccess(result);
    } else {
      return ResultVO.buildError(-1, 'delete failed!');
    }
  }

  @Post("/update")
  public async update(@Body() configInfo:IConfigInfo) {
    if (configInfo._id === undefined || configInfo._id === "")
      return ResultVO.buildError(-1, "id can not null");
    const response = await DBService.ConfigService.updateConfig(configInfo);
    return response ? ResultVO.buildSuccess() : ResultVO.buildError();
  }

}
