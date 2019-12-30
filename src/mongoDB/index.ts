import * as mongoose from 'mongoose';
import config from '../config';
(mongoose as any).Promise = global.Promise


export const DB = mongoose
export const { Schema } = DB
export const connect = () => {
  // 连接数据库
  let doConnect = () => {
    DB.connect(config.mongoDB.DBPath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }
  DB.set('useCreateIndex', true)
  doConnect();

  // 连接错误
  DB.connection.on('error', error => {
    console.log('DB connect error: ', error)
  })

  // 断线重连
  DB.connection.on('disconnected', () => {
    doConnect();
  })

  // 连接成功
  DB.connection.once('open', () => {
    console.log('DB connected successfully!')
  })

  return DB;
}

