import UserMapper, { IUserInfo, IQuery } from "../../dao/UserMapper";
import { ILoginResult } from "../../VO";

/**
 * @Description: user service类，处理用户的数据库操作以及业务逻辑
 * @Author: chengcheng
 * @Date: Create in 10:50 2019/12/27
 * @Modified By:
 */
export default class UserService {
  public static async createUser(userInfo:IUserInfo)  {
    return UserMapper.createUser(userInfo);
  }

  public static async isExistName(userName:string) {
    return UserMapper.isExistName(userName);
  }

  public static async doLogin(userInfo:IUserInfo) {
    let isHasUser = await UserMapper.isExistName(userInfo.username);
    let loginResult:ILoginResult = {
      token: ''
    }
    if (isHasUser) {
      let queryUserInfo = await UserMapper.getUserByName(userInfo.username);
      if (queryUserInfo.password === userInfo.password) {
        loginResult.token = userInfo.username
        return loginResult;
      } else {
        return loginResult;
      }
    }
    return loginResult;
  }

  public static async findAll(query: IQuery) {
    return UserMapper.findAll(query);
  }

  public static async delById(id:string) {
    return UserMapper.delById(id);
  }
}














