import ILibSimpleInfo from '../../../dto/LibSimpleInfoDTO';
export default interface IProjectInfoVO {
  _id: String,
  // 项目名称
  name: String,
  // 项目描述
  description: String,
  // 项目标签
  tags: [String],
  // 项目发布地址
  publishAddr: String,
  // 项目需要发布的lib列表
  relyLibIdS: Array<ILibSimpleInfo>,
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
