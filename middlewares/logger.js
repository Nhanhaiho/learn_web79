const logger = (req, res, next) => {
    // rồi ở đây mình check xem cái req đúng yêu cầu thông tin đăng nhập thì mình sẽ cho next
    console.log('new request')
    next()
}

export default logger