import express from "express";
// import { posts } from './data/posts.js'
// import {users} from './data/users.js'
const app = express();
const PORT = 3001;
const endpoint = "http://localhost:3000";
app.use(express.json());

// crud

// app.get("/users", (req, res) => {
//   fetch(`${endpoint}/users`)
//     .then((rs) => {
//       return rs.json();
//     })
//     .then((data) => {
//       res.status(200).json({
//         message: "Users",
//         data: {
//           item: data,
//           totalItem: data.length,
//         },
//       });
//     });
// });

app.get("/posts", (req, res) => {
  fetch(`${endpoint}/posts`)
    .then((rs) => {
      return rs.json();
    })
    .then((data) => {
      res.status(200).json({
        message: "Posts",
        data: {
          item: data,
          totalItem: data.length,
        },
      });
    });
});

// có một vấn đề là .then .catch  nên giờ viết theo try catch
// get user tra ve
app.get("/users", async (req, res) => {
  try {
    const rs = await fetch(`${endpoint}/users`);
    const data = await rs.json();
    console.log(data);
    if (data) {
      res.status(200).json({
        message: "Users by using try catch",
        data: {
          item: data,
          item_total: data.length,
        },
      });
    } else {
      //   no tim ko thay se tra ve 1 cai loi
      res.sendStatus(404);
      throw new Error("data not found");
    }
  } catch (error) {
    res.sendStatus(404);
    throw new Error(error);
  }
});



// check nguoi dung nhap dung thong tin hay chua
app.post('/login', async (req, res) => {
    const body = req.body;
    
    try {
        if (!body.username) {
            throw new Error('username is required')
        }

        if (!body.password) {
            throw new Error('password is required')
        }
        // res.send('hello')
        // cai nay la goi den user cua minh 
        const rs = await fetch(`${endpoint}/users`)
        const users = await rs.json()
        // check coi co bi sai hoac bi bo trong k 
        if (!users || users.length === 0) {
            throw new Error('user not found')
        }

        const existingUser = users.find(element => element.username == body.username)
        if (!existingUser) {
            res.status(404)
            throw new Error('user not found')
        }

        const isMatchPassword = existingUser.password === body.password
        if (!isMatchPassword) {
            res.status(405)
            throw new Error('username/password is not correct')
        }
        res.status(200).json({
            message: 'Login successfully',
            data: {
                id: existingUser.id,
                username: existingUser.username
            }
        })

    } catch (error) {
        res.status(405).json({
            message: error.message,
            data :null
        })
    }
})


// dang ki nguoi dung moi
app.post('/register', async (req, res) => {
    const {username,password} = req.body
    try {
         if (!username) {
           throw new Error("username is required");
         }

         if (!password) {
           throw new Error("password is required");
         }
        const rs = await fetch(`${endpoint}/users`);
        const users = await rs.json();
        // console.log() --> check user co chay hay k da
        
        // console.log(users);
        // kt xem user do co ton tai hay chua
        const existingUsers = users.find(element => element.username == username)
        

        if (existingUsers) {
             throw new Error("username is already create!!!")
        }
        

        const id = `U${Math.floor(Math.random() * 10000)}`

        const newUser = {
            id,username,password
        }
        users.push(newUser)
        res.status(201).json({
            message: 'user created!!!',
            data: {
                id,
                username,
            }
        })
        // console.log(id)
        // res.send("hello");
    } catch (error) {
        res.status(405).json({
            message: error.message,
            data :null
        })
    }
    
})




// app.get("/users", (req, res) => {
//   fetch(`${endpoint}/users`)
//     .then((rs) => {
//       if (!rs.ok) {
//         // If the response is not OK, throw an error with the status text
//         return rs.text().then((text) => {
//           throw new Error(text);
//         });
//       }
//       // Otherwise, parse the response as JSON
//       return rs.json();
//     })
//     .then((data) => {
//       res.status(200).json({
//         message: "Users",
//         data: {
//           items: data, // Changed 'item' to 'items' to better reflect that it's an array
//           totalItems: data.length, // Changed 'totalItem' to 'totalItems' to match plural
//         },
//       });
//     })
//     .catch((error) => {
//       // Handle any errors that occur during fetch or JSON parsing
//       console.error("Error fetching users:", error);
//       res.status(500).json({
//         message: "Error fetching users",
//         error: error.message,
//       });
//     });
// });

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`server starting at http://localhost:${PORT}`);
});
