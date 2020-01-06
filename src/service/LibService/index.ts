
/**
 * @Description: lib服务
 * @Author: chengcheng
 * @Date: Create in 10:50 2019/12/27
 * @Modified By:
 */

import { ILibInfo, IQuery } from '../../dao/LibMapper';
import { LibMapper } from '../../dao';
import IOptionsVO from '../../VO/OptionsVO';
import { ILibVO } from '../..//VO/LibVO';
import ConfigMapper, { IConfigInfo } from '../../dao/ConfigMapper';
export default class LibService {
  public static async createLib(libInfo:ILibInfo)  {
    // step1: 创建lib
    let alib:any = await LibMapper.createLib(libInfo);
    if (!alib) return false;
    let aconfig:any = await ConfigMapper.createConfig({
      userId: alib._id,
      ownerId: alib._id,
      configContent: "{}"
    })
    let newLib:ILibInfo = {
      _id: alib._id,
      name: alib.name,
      description: alib.description,
      tags: [...alib.tags],
      reposPath: alib.reposPath,
      publishAddr: alib.publishAddr,
      apiDocPath: alib.apiDocPath,
      configPath: alib.configPath
    }
    let libVo:ILibVO = {
      ...newLib,
      meta: {...alib.meta},
      config: {
        _id: "",
        configContent: "",
        userId: "",
        ownerId: ""
      }
    }
    if (aconfig) {
      newLib.configPath = aconfig._id
      let updateLib = await LibMapper.update(newLib)
      if (updateLib) {
        libVo.configPath = aconfig._id
        libVo.config = {
          _id: aconfig._id,
          userId: aconfig.userId,
          ownerId: aconfig.ownerId,
          configContent: aconfig.configContent
        }
      }
    }
    return libVo;
  }

  public static async isExistName(name:string) {
    return LibMapper.isExistName(name);
  }


  public static async findAll(query: IQuery) {
    // 查询配置组装返回
    let libs:Array<ILibVO> = []
    let result = await LibMapper.findByQuery(query);
    if(result && result.total > 0) {
      for (let i = 0; i < result.total; i++) {
        let alib = result.libs[i];
        let aConfig:IConfigInfo = {
          _id: "",
          configContent: "",
          userId: "",
          ownerId: ""
        };
        let libVo:ILibVO = {
          _id: alib._id,
          name: alib.name,
          description: alib.description,
          tags: [...alib.tags],
          reposPath: alib.reposPath,
          publishAddr: alib.publishAddr,
          apiDocPath: alib.apiDocPath,
          configPath: alib.configPath,
          meta: {...alib.meta},
          config: aConfig
        }
        if (result.libs[i].configPath === "") {
          libs.push(libVo)
          continue;
        }
        let config = await ConfigMapper.findById(result.libs[i].configPath.toString())
        if (config) {
          libVo.config = {
            _id: config._id,
            userId: config.userId,
            ownerId: config.ownerId,
            configContent: config.configContent
          }
        }
        libs.push(libVo)
      }
    }
    return {
      total: result.total,
      libs
    }
  }

  public static async delById(id:string) {
     const alib = await LibMapper.findById(id);
     let result
     if (alib) {
       if (alib.configPath !== "") {
          result = ConfigMapper.delById(alib.configPath.toString())
       }
     }
    return LibMapper.delById(id) && result;
  }

  public static async updateTheLib(libInfo:ILibInfo) {
    const result = await LibMapper.update(libInfo);
    if (result) {
      const alib = await LibMapper.findById(libInfo._id);
      let libVo:ILibVO = {
        _id: alib._id,
        name: alib.name,
        description: alib.description,
        tags: [...alib.tags],
        reposPath: alib.reposPath,
        publishAddr: alib.publishAddr,
        apiDocPath: alib.apiDocPath,
        configPath: alib.configPath,
        meta: {...alib.meta},
        config: {
          _id: "",
          configContent: "",
          userId: "",
          ownerId: ""
        }
      }
      if (libVo.configPath !== "") {
        let config = await ConfigMapper.findById(libVo.configPath.toString())
        if (config) {
          libVo.config = {
            _id: config._id,
            userId: config.userId,
            ownerId: config.ownerId,
            configContent: config.configContent
          }
        }
      }
      return libVo;
    }
    return false
  }


  /**
   * 返回libs的选项列表
   * @returns Array<IOptionsVO>
   */
  public static async findOptMapper() {
    const result = await LibMapper.findAll();
    let options:Array<IOptionsVO> = [];
    if (result) {
      result.forEach((item) => {
        let option = {
          label: item.name.toString(),
          value: item._id
        }
        options.push(option);
      })
    }
    return options;
  }

  /**
   * 根据id获取带有配置的Lib信息
   * @param id
   */
  public static async findWithConfiById (id: string) {
    const alib = await LibMapper.findById(id);
    let libVo:ILibVO = {
      _id: alib._id,
      name: alib.name,
      description: alib.description,
      tags: [...alib.tags],
      reposPath: alib.reposPath,
      publishAddr: alib.publishAddr,
      apiDocPath: alib.apiDocPath,
      configPath: alib.configPath,
      meta: {...alib.meta},
      config: {
        _id: "",
        configContent: "",
        userId: "",
        ownerId: ""
      }
    }
    if (libVo.configPath !== "") {
      let config = await ConfigMapper.findById(libVo.configPath.toString())
      if (config) {
        libVo.config = {
          _id: config._id,
          userId: config.userId,
          ownerId: config.ownerId,
          configContent: config.configContent
        }
      }
    }
    return libVo;
  }

  /**
   * 根据id查找
   */
  public static async findById(id: string) {
    let ret = LibMapper.findById(id);
    return ret;
  }

}









