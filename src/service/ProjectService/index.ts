import ProjectMapper, { IProjectInfo, IQuery } from '../../dao/ProjectMapper';
import IProjectInfoVO from '../../VO/ProjectV0/ProjectInfoVO';
import { LibMapper } from '../../dao';
import { ILibSimpleInfo } from '../../dto';
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
  public static async getLibSimpleInfoByIdList (relyLibIdS: Array<String>) {
    let libSimpleInfoLists: Array<ILibSimpleInfo> = [];
    for (let j = 0, len = relyLibIdS.length; j < len; j++) {
      let strId = relyLibIdS[j].toString();
      let resLib = await LibMapper.findById(strId)
      let libSimpleInfo:ILibSimpleInfo = {
        name: resLib.name.toString(),
        _id: resLib._id,
        description: resLib.description.toString()
      }
      libSimpleInfoLists.push(libSimpleInfo);
    }
    return libSimpleInfoLists;
  }
}



