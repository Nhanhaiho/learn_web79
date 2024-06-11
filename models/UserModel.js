import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  username: {
    required: true,
    // type co the co nhiu kieu string , number, obj,date,...
    type: String,
    // bắt buộc nó chỉ là duy nhất thôi
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    type: String,
  },
  createdAt: {
    type:Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  }
});

// mongoose no sẽ tạo ra cho mình một collection 
// ở đây nó tạo ra collection users và mình truyền vào userSchema bao gồm 4 document bên trong
const UserModel = mongoose.model("users", userSchema);
export default UserModel