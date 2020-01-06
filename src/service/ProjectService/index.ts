import ProjectMapper, { IProjectInfo, IQuery } from '../../dao/ProjectMapper';
import IProjectInfoVO from '../../VO/ProjectV0/ProjectInfoVO';
import { LibMapper } from '../../dao';
import { ILibSimpleInfo } from '../../dto';
import config from '../../config';
import { InitProject } from './PublishHandle';
import { PublishEnum } from './../../enums/PublishEnum';
import * as shell from "shelljs";
// import * as replace from "replace-in-file";
import * as path from "path";
import * as fs from "fs";
import { npmInstall, npmInstallLib, npmUpdateLib } from './PublishHandle/LibInstall';

export default class ProjectService {

  /**
   * 创建一个项目
   * @param project
   */
  public static async createProject(project:IProjectInfo)  {
    let newProject:any = await ProjectMapper.createProject(project);
    let projectinfo:IProjectInfoVO = {
      _id: newProject._id,
      name: newProject.name,
      status: newProject.status,
      description: newProject.description,
      tags: newProject.tags,
      publishAddr: "",
      meta: {...newProject.meta},
      relyLibIdS: [],
    }
    if (newProject) {
      const projectPath = path.resolve(config.publish.projects_path, `./${newProject._id}`)
      if (!fs.existsSync(projectPath)) {
        shell.mkdir(projectPath);
      }
      let libInfoList = await ProjectService.getLibSimpleInfoByIdList(newProject.relyLibIdS);
      projectinfo.relyLibIdS = [...libInfoList];
    }
    return projectinfo;
  }

  public static async isExistName(name:string) {
    return ProjectMapper.isExistName(name);
  }

  /**
   * 根据条件查询数据
   * @param query
   */
  public static async findAll(query: IQuery) {
    const projects =  await ProjectMapper.findAll(query);
    let projectInfosVO = {
      total: 0,
      projects: new Array<IProjectInfoVO>()
    }
    if (projects.total > 0) {
      projectInfosVO.total = projects.total
      for (let i = 0; i < projects.total; i++) {
        let pro = projects.projects[i];
        let projectinfo:IProjectInfoVO = {
          _id: pro._id,
          name: pro.name,
          status: pro.status,
          description: pro.description,
          tags: pro.tags,
          publishAddr: pro.publishAddr,
          meta: {...pro.meta},
          relyLibIdS: [],
        }
        let libInfoList = await ProjectService.getLibSimpleInfoByIdList(pro.relyLibIdS);
        projectinfo.relyLibIdS = [...libInfoList];
        projectInfosVO.projects.push(projectinfo);
      }
      return projectInfosVO;
    }
  }

  /**
   * 根据id删除
   * @param id
   */
  public static async delById(id:string) {
    return ProjectMapper.delById(id);
  }

  /***
   * 更新项目
   */
  public static async updateTheProject(project:IProjectInfo) {
    const result = await ProjectMapper.update(project);
    if (result) {
      const newProject = await ProjectMapper.findById(project._id);
      let projectinfo:IProjectInfoVO = {
        _id: newProject._id,
        name: newProject.name,
        status: newProject.status,
        description: newProject.description,
        tags: newProject.tags,
        publishAddr: newProject.publishAddr,
        meta: {...newProject.meta},
        relyLibIdS: [],
      }
      if (newProject) {
        let libInfoList = await ProjectService.getLibSimpleInfoByIdList(newProject.relyLibIdS);
        projectinfo.relyLibIdS = [...libInfoList];
      }
      return projectinfo;
    }
    return false
  }

  /**
   * 根据id列表换取lib简单信息列表
   */
  private static async getLibSimpleInfoByIdList (relyLibIdS: Array<String>) {
    let libSimpleInfoLists: Array<ILibSimpleInfo> = [];
    for (let j = 0, len = relyLibIdS.length; j < len; j++) {
      let strId = relyLibIdS[j].toString();
      let resLib = await LibMapper.findById(strId)
      if (resLib === null) continue;
      let libSimpleInfo:ILibSimpleInfo = {
        name: resLib.name.toString(),
        _id: resLib._id,
        description: resLib.description.toString()
      }
      libSimpleInfoLists.push(libSimpleInfo);
    }
    return libSimpleInfoLists;
  }

  /***
   * 发布一个打包好的模块
   */
  public static async publish(id: string){
    setTimeout(async () => {
      const aProject = await ProjectMapper.findById(id);
      const curStatus = await ProjectService.getStatus(id);
      let initProject = new InitProject(config.publish.template_path, config.publish.projects_path);
      if (aProject && curStatus) {
        if (curStatus.status === PublishEnum.INITED) {
          return false;
        }
        if (curStatus.status === PublishEnum.FAILED) {
          // todo clearProjectsTemple();
        }
        //step1 初始化模板
        let initTemplateRet = initProject.InitProjectFromTemplate(id, aProject.name.toString());
        if (!initTemplateRet) {
          ProjectMapper.updateStatus(id, PublishEnum.FAILED);
          console.log(`failed init from template ${aProject.name.toString()}`);
          return false;
        }
        console.log(`create the ${aProject.name.toString()} successfuly!`);
        // // 修改状态为初始化
        // let result = await ProjectMapper.updateStatus(id, PublishEnum.PUBLISHED);
        // if(!result) return false;

        // step2: 安装依赖
        let npmInstallRet = await npmInstall(path.resolve(config.publish.projects_path, `./${aProject._id}`));
        if (!npmInstallRet) {
          ProjectMapper.updateStatus(id, PublishEnum.FAILED);
          console.log(`failed install base libs ${aProject.name.toString()}`);
          return false;
        }

        // step3: 生成导出代码
        // 获取导出模块
        
        // 生成私有模块配置

        // 生成代码

        // 安装依赖


        // step4: 发布模块
        // build模块
        // 发布模块
      } else {
        ProjectMapper.updateStatus(id, PublishEnum.CREATE);
      }
    }, 5000)
    let result = await ProjectMapper.updateStatus(id, PublishEnum.INITED);
    if (result) {
      return {
        _id: id,
        status: PublishEnum.INITED
      }
    }
    return false;
  }

  /**
   * 根据id获取项目导出的模块以及配置
   * @param projectId
   */
  public static async getLibsAndConfigs(projectId:string) {

  }

  public static async getStatus(id:string) {
    const aProject = await ProjectMapper.findById(id);
    if (aProject) {
      return {
        _id: id,
        status: aProject.status
      }
    }
    return false;
  }

}



