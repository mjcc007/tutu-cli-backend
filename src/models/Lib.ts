import {DB, Schema} from '../mongoDB';

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
const Lib = DB.model('Project', LibSchema);
export default Lib;






