import { Config } from '../../models';
export interface IConfigInfo {
  _id?: string,
  configContent: String,
  ownerId: String,
  userId: String,
}

export interface IQuery {
  pageIndex: string
  pageSize: string
  name?: string
}
export default class ConfigMapper {
  /**
  * 创建一个配置
  * @param IConfigInfo
  */
  public static async createConfig(configInfo:IConfigInfo)  {
    return new Promise((resolve, reject) => {
      Config.create(
        {...configInfo},
        (err: string, doc: object) => {
          if (err) {
            reject(err);
          } else {
            resolve(doc)
          }
        }
      );
    });
  }

  /**
   * 根据所属id和使用者id查找
   * @param userId
   * @param ownerId
   */
  public static async findByids(userId:string, ownerId:string) {
    if (userId === undefined || ownerId === undefined) return false;
    if (userId === "" || ownerId === "") return false;
    let data:Object = {userId, ownerId};
    const config = await Config.findOne(data)
    return config;
  }

  /**
   * 根据id查找
   */
  public static async findById(id:string) {
    return Config.findOne({_id: id})
  }

  /**
   * 根据id删除
   */
  public static async delById(id:string) {
    return new Promise((resolve, reject) => {
      Config.deleteOne({_id:id}, (err:any) => {
        if (err) {
          console.log(err);
          reject(false);
        } else {
          resolve(true)
        }
      })
    })
  }

  /**
   * 更新配置
   */
  public static async update(configInfo:IConfigInfo) {
     if (configInfo._id === "" ||  configInfo._id === undefined) {
      return false
    }
    try {
      let result = await Config.updateOne({_id: configInfo._id}, configInfo)
      return result;
    } catch(err) {
      console.log(err)
      return false;
    }
  }
}









