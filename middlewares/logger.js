const logger = (req, res, next) => {
    // rồi ở đây mình check xem cái req đúng yêu cầu thông tin đăng nhập thì mình sẽ cho next
    const { id } = req.query
    if (id) {
        console.log("new request");
        // nếu có id sẽ đc đi tiếp là (next())
        next();
    } else {
        res.status(401).json({ 
            message :'unauthorization'
        })
    }
    
}

export default logger