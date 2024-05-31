import http from 'http';

const app = http.createServer((req, res) => {
    res.end('hello world!');
})

const PORT = 3001



app.listen(PORT, (err) => {
    if (err) {
        console.log('server is disconnect')
    }
    console.log(`server starting at http://localhost:${PORT}`)
})

// this is everything we need in lesson1
