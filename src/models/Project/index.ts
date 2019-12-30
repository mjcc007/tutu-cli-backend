import {DB, Schema} from '../../mongoDB';
import {Document} from 'mongoose';

export type ProjectDocument = Document & {
  // 项目名称
  name: String,
  // 项目描述
  description: String,
  // 项目标签
  tags: [String],
  // 发布状态
  status: Number,
  // 项目生成路径
  buildPath: String,
  // 项目发布地址
  publishAddr: String,
  // 项目需要发布的lib列表
  relyLibIdS: [String],

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
const ProjectSchema = new Schema({
  // 项目名称
  name: String,
  // 项目描述
  description: String,
  // 项目标签
  tags: [String],
  // 发布状态
  status: {
    type: Number,
    default: 0
  },
  // 项目生成路径
  buildPath: String,
  // 项目发布地址
  publishAddr: String,
  // 项目需要发布的lib列表
  relyLibIdS: [String],

  meta: {
     // 创建日期
    createdAt: {
      type: Date,
      default: Date.now()
    },
    // 更新日期
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

ProjectSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { meta: { updatedAt: Date.now() }});
  next();
})


const Project = DB.model<ProjectDocument>('Project', ProjectSchema);
export default Project;

