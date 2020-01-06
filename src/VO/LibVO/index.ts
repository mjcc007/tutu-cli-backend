
import { IConfigInfo } from '../../dao/ConfigMapper';

export interface ILibVO {
  _id?: String,
  // lib 名称
  name: String,
  // 描述
  description: String,
  // 标签
  tags: Array<String>,
  // 仓库地址
  reposPath: String,
  // 发布地址
  publishAddr: String,
  // api doc Path
  apiDocPath: String,
  // 配置
  configPath: String,
  // 配置信息
  config: IConfigInfo,
  meta: {
    // 创建日期
    createdAt: {
      type: Date,
    },
    // 更新日期
    updatedAt: {
      type: Date,
    }
  }
}
