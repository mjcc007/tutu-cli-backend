import { DB, Schema } from '../mongoDB';

const userScheme = new Schema({

})

const User = DB.model('User', userScheme);

export default User;
