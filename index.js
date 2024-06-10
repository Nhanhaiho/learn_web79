import express from 'express';
import { posts } from './data/posts.js'
// import {users} from './data/users.js'
const app = express();
const PORT = 3001

app.use(express.json())

// crud

app.get('/', (req, res) => {
    console.log(req)
    res.send('hello mindx')
})

// write api for user to get the posts

app.get('/posts', (req, res) => {
    res.status(200).json({ 
        message: 'Posts',
        data:{items:posts,totalItems:posts.length}
    })
})

app.get('/posts/:id', (req, res) => {
    const { id } = req.params
    
    const item = posts.find(element => `${element.id}` === id)

    if (item) {
        res.status(200).json({
            message: 'get successfully',
            data : item
        })
    }
    res.status(403).json({
        message: 'not found',
        data :[]
    })
})

app.get('/detail', (req, res) => {
    const {id} = req.query
    const item = posts.find((element) => `${element.id}` === id);
    
    if (item) {
      res.status(200).json({
        message: "get successfully",
        data: item
      })
    }
    res.status(403).json({
      message: "not found",
      data: []
    })
})

app.delete('/delete-post', (req, res) => {
    const { id } = req.query
    // truoc khi xoa phai tim no co ko de xoa
    //tuc la phai xet id no co giong hay ko de xoa
    const index = posts.findIndex(element => `${element.id}` === id)
    if (index !== -1) {
        posts.splice(index, 1)
        res.status(203).json({
            message: 'post is deleted',
            data: {
                total_item: posts.length
            }
        })
    } else {
        res.status(404).json({
            message: 'data not found',
            data : []
        })
    }

})


app.post('/add-new-post', (req, res) => {

    const item = {
        id: Math.floor(Math.random() * 10000),
        ...req.body
    }
    posts.push(item)

    res.status(201).json({
        message: 'add new post successfully',
        data:{item,totalItems:posts.length}
    })
})

app.put("/update-post", (req, res) => {
    const { id } = req.query
    const body = req.body
    const index = posts.findIndex(element => `${element.id}` === id)
    
    if (index !== -1) {
        posts[index] = body;
        
         res.status(201).json({
           message: "update post successfully",
           data: posts[index]
         })
    } else {
        res.status(404).json({
            message: 'post not found',
            data: []
        })
    }

 
});



app.listen(PORT, (err) => {
    if (err) {
        console.error(err)
        return
    }    

    console.log(`server starting at http://localhost:${PORT}`)
})

