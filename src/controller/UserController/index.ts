import {JsonController, Param, Body, Get, Post, Put, Delete, QueryParam} from "routing-controllers";
import { IUserInfo } from "src/dao/UserMapper";
import { ResultVO } from "../../VO";
import DBService from '../../service';

@JsonController("/user")
export default class UserController {
  @Post("/login")
  public async login(@Body() userInfo:IUserInfo) {
    if (userInfo.password === "" || userInfo.username === "") {
      return ResultVO.buildError(-1, "the password or username can not null");
    }
    let result = await DBService.UserService.doLogin(userInfo);
    if (result.token === "") return ResultVO.buildError(-1, "login error!");
    return ResultVO.buildSuccess(result);
  }

  @Get("/info")
  public async info(@QueryParam("token") token:string) {
    console.log(token)
    if (token === "admin") {
      return ResultVO.buildSuccess({
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      });
    }
    return ResultVO.buildError(-1, "the token is not vailed");
  }

  @Post("/logout")
  public async logout() {
    return ResultVO.buildSuccess();
  }

  @Post("/create")
  public async create(@Body() userInfo:IUserInfo) {
    if (userInfo.password === "" || userInfo.username === "") {
      return ResultVO.buildError(-1, "the password or username can not null");
    }
    let isExist = await DBService.UserService.isExistName(userInfo.username);
    if (isExist) {
      return ResultVO.buildError(-1, 'it is suggested to change the username');
    }
    const response = await DBService.UserService.createUser(userInfo);
    if (response) {
      return ResultVO.buildSuccess(response);
    } else {
      return ResultVO.buildError();
    }

  }
}




