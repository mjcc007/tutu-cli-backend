import { Project } from '../../models';

export interface IProjectInfo {
  _id?: string,
  // 项目名称
  name: string,
  // 项目描述
  description?: string,
  // 项目标签
  tags?: Array<string>,
  // 项目生成路径
  buildPath?: string,
  // 项目发布地址
  publishAddr?: string,
  // 项目需要发布的lib列表
  relyLibIdS?: Array<string>,
}

export interface IQuery {
  pageIndex: string
  pageSize: string
  name?: string
}
export default class ProjectMapper {
  public static async createProject(project:IProjectInfo)  {
    return new Promise((resolve, reject) => {
      Project.create(
        {...project},
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
    let count = await Project.countDocuments({name: name})
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
    try {
      const projects = await Project.find(data)
        .sort({'meta.createdAt': -1})
        .limit(Number.parseInt(pageSize))
        .skip(skip);
      const total = await Project.countDocuments({})
      return {
        total,
        projects
      }
    } catch(err) {
      console.log(err)
    }
  }

  public static async update(project:IProjectInfo) {
    if (project._id === "" ||  project._id === undefined) {
      return false
    }
    try {
      let result = await Project.updateOne({_id: project._id}, project)
      return result;
    } catch(err) {
      console.log(err)
    }
  }

  public static async delById(id:string) {
    return new Promise((resolve, reject) => {
      Project.deleteOne({_id:id}, (err:any) => {
        if (err) {
          console.log(err);
          reject(false);
        } else {
          resolve(id)
        }
      })
    })
  }


  public static async findById(id: string) {
    const lib = await Project.findOne({_id: id})
    return lib
  }
}



