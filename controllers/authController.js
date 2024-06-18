import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const body = req.body
  const {username, password} = body
  try {
    // van kiem tra xem user co ton tai hay ko 
    const user = await UserModel.findOne({ username })
    console.log(user)
    if (!user) {
      throw new Error('user not found')
    }
    // minh van se compare xem cai password ma nguoi dung nhap vao va password dc ma hoa roi va da dc luu có giống nhau ko ?
    const isMatchPassword = await bcrypt.compare(password, user.password)
    // neu ko giong thi
    if (!isMatchPassword) {
      // send email : nodemailer
      // send notify : firebase cloud messaging http v1 api
      // kiểu như là khi thông báo tài khoản có nghi vấn đột nhập lạ nên khuyên đổi pass
      // phát triển thêm tính năng ở đây kiểu như là đổi pass, resetpass ,......
      throw new Error('password or username wrong')
    }
    // con neu giong thi res.status(200)

    res.status(201).json({
      message: 'login successfully',
      data: {
        username,
        email: user.email,
        _id:user._id
      }
    })


  } catch (error) {
    res.status(405).json({
      message: error.message,
      data:[]
    })
  }

};
const register = async (req, res) => {
  try {
    // mongoose: find --> filter (array)
    //          findOne -> find(array)
    const body = req.body;
    const { username, password } = body
    // console.log(body);

    // mình sẽ thử tìm kiếm trên mongodb sau đó sẽ áp vào đây để kiếm user tương ứng
    // const user = await UserModel.findOne({
    //   $and: [{ username: { $eq: username } }, { email: { $eq: body.email} }]
    // });
    
    const user = await UserModel.findOne({username})

    if (user) {
      throw new Error("user existing");
    }

    // day la minh hashpassword bang bcrypt
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password,salt) 
    
    const newUser = new UserModel({
      email: body.email,
      username,
      password : hashPassword
    })
    await newUser.save()

    res.status(200).json({
      message: 'create successfully!!!',
      data: {
        username,email: body.email,_id:newUser._id
      }
    })

  } catch (error) {
    res.status(405).json({
      message: error.message,
      data: []
    });
  }
};

export { login, register };
