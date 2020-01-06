import {DB, Schema} from '../../mongoDB';
import {Document} from 'mongoose';

export type ConfigDocument = Document & {
  configContent: String,
  ownerId: String,
  userId: String,
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
const ConfigSchema = new Schema({
  configContent: String,
  ownerId: String,
  userId: String,

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
ConfigSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { meta: { updatedAt: Date.now() }});
  next();
})
const TConfig = DB.model<ConfigDocument>('TConfig', ConfigSchema);
export default TConfig;











