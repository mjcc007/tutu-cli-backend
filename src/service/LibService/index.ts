
/**
 * @Description: lib服务
 * @Author: chengcheng
 * @Date: Create in 10:50 2019/12/27
 * @Modified By:
 */

import { ILibInfo, IQuery } from '../../dao/LibMapper';
import { LibMapper } from '../../dao';
import IOptionsVO from '../../VO/OptionsVO';
export default class LibService {
  public static async createLib(libInfo:ILibInfo)  {
    return LibMapper.createLib(libInfo);
  }

  public static async isExistName(name:string) {
    return LibMapper.isExistName(name);
  }


  public static async findAll(query: IQuery) {
    return LibMapper.findByQuery(query);
  }

  public static async delById(id:string) {
    return LibMapper.delById(id);
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
   * 根据id查找
   */
  public static async findById(id: string) {
    let ret = LibMapper.findById(id);
    return ret;
  }

}









