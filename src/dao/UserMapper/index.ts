/**
 * @Description: user service类，处理用户的数据库操作以及业务逻辑
 * @Author: chengcheng
 * @Date: Create in 10:50 2019/12/27
 * @Modified By:
 */


import { User } from '../../models';

export interface IUserInfo {
  _id?: string,
  username: string,
  email?: string,
  password: string,
}

export interface IQuery {
  pageIndex: string
  pageSize: string
  name?: string
}
export default class UserMapper {
  public static async createUser(userInfo:IUserInfo)  {
    return new Promise((resolve, reject) => {
      User.create(
        {...userInfo},
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

  public static async isExistName(userName:string) {
    let count = await User.countDocuments({username: userName})
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
    const libs = await User.find(data)
      // .sort({meta.createdAt: -1})
      .limit(Number.parseInt(pageSize))
      .skip(skip);
    const total = await User.countDocuments({})
    return {
      total,
      User
    }
  }

  public static async getUserByName (username:string) {
    const userInfo:any = await User.find({username: username});
    return userInfo[0];
  }

  public static async delById(id:string) {
    return new Promise((resolve, reject) => {
      User.deleteOne({_id:id}, (err:any) => {
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














