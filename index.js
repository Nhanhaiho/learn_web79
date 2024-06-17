import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserModel from "./models/UserModel.js";
import authRouter from "./routes/authRouter.js";
import taskRouter from "./routes/taskRouter.js";
import logger from "./middlewares/logger.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const dburl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@demodatabase.6j0vmzn.mongodb.net/?retryWrites=true&w=majority&appName=demoDATABASE`;


 
// minh ket noi no

// console.log(process.env.DB_USERNAME)
// express json nhu mot nguoi gac cong, muốn tới app.use(/auth || /tasks) thì phải qua express.json()
app.use(express.json());
app.use(cors());
// còn nếu muốn middleware logger cả hệ thống thì
// app.use(logger)

// lesson 5
// khi minh co mot vai chuc nang thuoc dang ki cac thu

// mình sẽ có hai luồng
// luông này là luồng authen
// app.post('/login', (req, res) => {
//   res.send('login')
// })

// app.post('register', (req, res) => {
//   res.send('register')
// })
// minh đã định nghĩa ra rồi thì ko cần phải ghi đầy đủ như thế

// mới vào nó sẽ gọi auth router trước
app.use('/auth', authRouter)
app.use("/tasks", taskRouter);

// authentication và authorization
// api quan trọng ở
// các phương  (method: get,del,post)
//query,... 


const connectDB = async () => {
  try {
    await mongoose.connect(dburl);
    console.log("connect to database successfully!!!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// register
app.post('/signup', async (req, res) => {
  // consol.log('fad')
  try {
      const body = req.body;
      
      if (!body.username || !body.password) {
        res.sendStatus(401);
        throw new Error("missing value");
      }
      const {username, password} = body
      const existingUser = await UserModel.findOne({
        username: { $eq: username },
      });
    // console.log(existingUser)
    // res.send('hello')
      if (existingUser) {
        res.sendStatus(404);
        throw new Error("username has been used");
      }
      const newUser = new UserModel({
        username,
        password,
      });
    await newUser.save();
    res.status(200).json({
      message: 'create successfully',
      data:newUser
    })
  } catch (error) {
    res.sendStatus(404)
    throw new Error(error.message);
  }
  // mình xem nó truyền cho mình cái gì thì mình check trong usermodel
  // thấy đc cỏ hai cái là username và password là required = true

})


// minh goi lai ham connectDB va .then de khi ket noi dc database thi se chay server
// khi nó chạy try thành công thì nó sẽ chạy qua .then nếu ko nó sẽ chạy về catch(error)
// mongo phai luu ra collection
connectDB().then(() => {
  app.listen(PORT, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`server starting at http://localhost:${PORT}`);
  });
});
