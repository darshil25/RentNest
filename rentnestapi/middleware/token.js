function checktoken (req, res, next) {
    if ('b361dc54ca90a4dd02efaf412ed54f9a' != req.headers.apitoken) {
        res.status(401).json({
            "status": 401,
            "message": "Authentication failed!!"
        });
    } else {
        next()
    }
};

module.exports={
    checktoken
}