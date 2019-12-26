import { DB, Schema } from '../../mongoDB';
import {Document} from 'mongoose'
import * as bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10

export type UserDocument = Document & {
  username: string,
  email:  string,
  password: string,
  meta: {
    // 创建日期
    createdAt: Date,
    // 更新日期
    updatedAt: Date
  }
}

const userScheme = new Schema({
  username: {
    unique: true,
    type: String,
  },
  email: {
    unique: true,
    type: String
  },
  password: {
    unique: true,
    type: String
  },

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

userScheme.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { meta: { updatedAt: Date.now() }});
  next();
})

userScheme.pre('save', function(next) {
  // 判断当前密码是否更改
  if (!this.isModified('password')) return next();
  // 密码加密
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.get('password'), salt, (err, hash) => {
      if (err) return next(err)
      this.set('password', hash)
      next()
    })
  });
  next();
})


userScheme.methods = {
  comparePassword: (_password:string, password:string) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

const User = DB.model<UserDocument>('User', userScheme);

export default User;
