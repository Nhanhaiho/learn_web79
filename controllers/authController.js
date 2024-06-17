import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { JWT } from "../utils/getJsonWebToken.js";
const login = async (req, res) => {
  // login vẫn nhận vào một cái body để check username vs password
  try {
    const body = req.body;
    const { username, password } = body;
    if (!password || !username) {
      res.status(401);
      throw new Error("missing value");
    }
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      res.status(402);
      throw new Error("user not found");
    }
    // đây chính là lúc mình so sánh giữa cái password đc mã hóa với cái password mà user nhập vào
    const isMatchPassword = bcrypt.compare(password, existingUser.password);
    // mình sẽ kiểm trả nếu nó giống hay ko
    if (!isMatchPassword) {
      throw new Error("username or passowrd wrong");
      }
    //   lưu ý khi trả về thì ko đc trả password
    res.status(200).json({
      message: "welcome back ",
      data: {
        username,
        _id: existingUser._id,
        accessToken: JWT.GetJWT({ id: existingUser._id, username }),
      },
    });
  } catch (error) {
      res.status(404).json({
        message:error.message
    })
  }
};

const register = async (req, res) => {
  const body = req.body;
  // body ở đây chính là những cái req mà trên postman gửi xuống
  // giờ mình destructering nó ra luôn
  const { username, password } = body;
  if (!password || !username) {
    throw new Error("missing value");
  }

  // Còn vì cái username trong userModel mình cho là uniqe: true
  // thì mình phải đi kiểm tra username có hayh chưa

  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    throw new Error("username existing ");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    username,
    password: hashPassword,
  });
  await newUser.save();
  // đến đây mình sẽ lấy jsonwebtoken trả lại cho người dùng
  console.log(body);
  res.status(201).json({
    message: "register successfully!!!",
    data: {
      username,
      accessToken: JWT.GetJWT({ id: newUser._id, username }),
    },
  });
  //
};

export { login, register };

// nhiem vu kiem tra json web token la ben backend ko phai front end
