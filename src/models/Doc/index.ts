import {DB, Schema} from '../../mongoDB';
import {Document} from 'mongoose';

export type DocDocument = Document & {
  docContent: String,
  ownerID: String,
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
const DocSchema = new Schema({
  docContent: String,
  ownerID: String,
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
DocSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { meta: { updatedAt: Date.now() }});
  next();
})
const TDoc = DB.model<DocDocument>('TDoc', DocSchema);
export default TDoc;
















