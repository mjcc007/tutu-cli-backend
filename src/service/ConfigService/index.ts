

/**
 * @Description: config 服务层
 * @Author: chengcheng
 * @Date: Create in 10:50 2019/1/5
 * @Modified By:
 */

import { IConfigInfo, IQuery } from '../../dao/ConfigMapper';
import { ConfigMapper } from '../../dao';
// import IOptionsVO from '../../VO/OptionsVO';
export default class ConfigService {
  /**
   * 创建一个配置
   * @param configInfo
   */
  public static async createConfig(configInfo:IConfigInfo)  {
    return ConfigMapper.createConfig(configInfo);
  }


  /**
   * 根据userid和ownerid查询配置
   */
  public static async findConfigByIds(userId:string, ownerId:string) {
    return ConfigMapper.findByids(userId, ownerId);
  }

  public static async updateConfig(configInfo:IConfigInfo) {
    return ConfigMapper.update(configInfo);
  }

  /**
   * 根据id查询
   * @param id
   */
  public static async findById(id:string) {
    return ConfigMapper.findById(id);
  }

  /**
   * 删除
   * @param id
   */
  public static async delId(id:string) {
    return ConfigMapper.delById(id);
  }


}






















