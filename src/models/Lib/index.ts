import {DB, Schema} from '../../mongoDB';
import {Document} from 'mongoose';

export type LibDocument = Document & {
  // lib 名称
  name: String,
  // 描述
  description: String,
  // 标签
  tags: [String],
  // 仓库地址
  reposPath: String,
  // 发布地址
  publishAddr: String,
  // api doc Path
  apiDocPath: String,
  // 配置
  configPath: String,
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
const LibSchema = new Schema({
  // lib 名称
  name: String,
  // 描述
  description: String,
  // 标签
  tags: [String],
  // 仓库地址
  reposPath: String,
  // 发布地址
  publishAddr: String,
  // api doc Path
  apiDocPath: String,
  // 配置
  configPath: String,

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
LibSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { meta: { updatedAt: Date.now() }});
  next();
})
const Lib = DB.model<LibDocument>('Project', LibSchema);
export default Lib;






