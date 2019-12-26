import {Controller, Param, Body, Get, Post, Put, Delete} from "routing-controllers";

@Controller()
export default class TestController {
  @Get("/test")
  getAll() {
    return "This action returns all test";
  }
}



