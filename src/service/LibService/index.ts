import { Lib } from '../../models';

export interface ILibInfo {
  _id?: string,
    // lib 名称
  name: string,
  // 描述
  description: string,
  // 标签
  tags: [string],
  // 仓库地址
  reposPath: string,
  // 发布地址
  publishAddr: string,
  // api doc Path
  apiDocPath: string,
  // 配置
  configPath: string
}

export interface IQuery {
  pageIndex: string
  pageSize: string
  name?: string
}
export default class LibService {
  public static async createLib(libInfo:ILibInfo)  {
    return new Promise((resolve, reject) => {
      Lib.create(
        {...libInfo},
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

  public static async isExistName(name:string) {
    let count = await Lib.countDocuments({name: name})
    return count > 0 ? true : false
  }


  public static async findAll(query: IQuery) {
    const { pageSize, pageIndex, name } = query;
    let data:Object = {};
    if (name) {
      data = {name}
    }
    const skip = Number.parseInt(pageIndex) * Number.parseInt(pageSize) -
      Number.parseInt(pageSize)
    const libs = await Lib.find(data)
      // .sort({meta.createdAt: -1})
      .limit(Number.parseInt(pageSize))
      .skip(skip);
    const total = await Lib.countDocuments({})
    return {
      total,
      libs
    }
  }

  public static async delById(id:string) {
    return new Promise((resolve, reject) => {
      Lib.deleteOne({_id:id}, (err:any) => {
        if (err) {
          console.log(err);
          reject(false);
        } else {
          resolve(id)
        }
      })
    })
  }
}









